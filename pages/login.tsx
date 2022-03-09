import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

type Props = {
    api: string;
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ api, loggedIn, setLoggedIn }: Props) => {
    const { data: session } = useSession();
    let router = useRouter();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);
    const [emailLoggedIn, setEmailLoggedIn] = useState<boolean>(false);

    async function login(e: React.MouseEvent<HTMLFormElement>) {
        if (api !== "") {
            e.preventDefault();
            await fetch(api + "/login", {
                method: "POST",
                body: JSON.stringify({ username: user, password: pass }),
                headers: { "Content-Type": "application/json" },
                mode: "cors",
            })
                .then((res) => {
                    if (res.status !== 200) {
                        setError(true);
                    } else {
                        return res.json();
                    }
                })
                .then((res) => {
                    if (res) {
                        localStorage.setItem("token", res.token);
                        setEmailLoggedIn(true);
                    }
                });
        }
    }

    useEffect(() => {
        if (emailLoggedIn && session) {
            setLoggedIn(true);
        } else {
            if (!session || !emailLoggedIn) {
                setLoggedIn(false);
            }
        }
    }, [emailLoggedIn, session, setLoggedIn]);

    return (
        <div className="w-11/12 flex justify-center items-center flex-col">
            <Head>
                <meta name="robots" content="noindex"></meta>
                <meta name="googlebot" content="noindex"></meta>
            </Head>
            <div className="w-11/12 flex justify-center ">
                <form className="p-5 mt-5 border border-black" onSubmit={login}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username:
                        </label>
                        <input
                            type="text"
                            className="border border-stone-300"
                            id="username"
                            onChange={(e) => {
                                setUser(e.target.value);
                                setError(false);
                            }}
                        />
                        <div id="userHelp" style={{ color: "red" }}>
                            You shouldnt be here and you know you shouldnt.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type="password"
                            className="border border-stone-300"
                            id="password"
                            onChange={(e) => {
                                setPass(e.target.value);
                                setError(false);
                            }}
                        />
                    </div>

                    <div className="flex justify-center gap-3">
                        {emailLoggedIn ? (
                            session ? (
                                <button
                                    className="p-3 bg-green-700"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        signOut();
                                        console.log("get logged out nerd");
                                    }}
                                >
                                    Sign out
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="p-3 bg-green-700"
                                        onClick={() => signIn()}
                                    >
                                        Sign in
                                    </button>
                                </>
                            )
                        ) : null}

                        <button type="submit" className="p-3 bg-green-700">
                            Submit
                        </button>
                    </div>
                    <div className="text-center">
                        <p>Login Complete: {loggedIn.toString()}</p>
                    </div>
                    {error ? <p className="p-0 m-0">Try again</p> : null}
                </form>
            </div>
        </div>
    );
};

export default Login;
