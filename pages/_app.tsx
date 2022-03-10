import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    let api = "http://localhost:3006";
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const verifyToken = useCallback(() => {
        if (localStorage.getItem("token") === null) {
            return;
        }

        fetch(api + "/verify", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem("token");
                setLoggedIn(false);
            } else {
                setLoggedIn(true);
            }
        });
    }, [api]);

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <SessionProvider session={session}>
            <Layout loggedIn={loggedIn} api={api}>
                <Component
                    {...pageProps}
                    api={api}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                />
            </Layout>
        </SessionProvider>
    );
}

export default MyApp;
