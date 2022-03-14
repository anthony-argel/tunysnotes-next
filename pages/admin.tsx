import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Key, useEffect, useState } from "react";
import TopicList from "../components/TopicsList";

type Props = {
    loggedIn: boolean;
    api: String;
};

type Notes = {
    _id: Key | null | undefined;
    title: String;
    text: String;
    date: String;
    tableOfContents: String;
    isVisible: boolean;
};

const Admin = ({ api, loggedIn }: Props) => {
    const [notes, setNotes] = useState<Notes[]>([]);

    useEffect(() => {
        fetch(api + "/admin/notes", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((res) => {
                if (res) {
                    console.log(res);
                    setNotes(res);
                }
            });
    }, [api]);

    return (
        <div className="flex justify-center flex-col items-center gap-5">
            {notes.length > 0 ? (
                <TopicList
                    sections={notes}
                    api={api.toString()}
                    loggedIn={loggedIn}
                    getAdminView={() => {}}
                ></TopicList>
            ) : null}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }
    return {
        props: {},
    };
};

export default Admin;
