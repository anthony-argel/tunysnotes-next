import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Key, useEffect } from "react";

type Notes = {
    _id: Key | null | undefined;
    title: String;
    text: String;
    date: String;
    tableOfContents: String;
};

type Props = {
    notes: Notes;
};

type NotesProps = {
    notes: Notes;
    title: string | string[] | undefined;
};

const NotesComponent = ({ notes, title }: NotesProps) => {
    return (
        <div className="flex flex-col-reverse p-4 gap-4 md:h-screen md:flex-row">
            <Head>
                <title>{notes ? notes.title : title} - Tuny&#39;s Notes</title>
            </Head>
            <div
                className="overflow-y-scroll p-4 md:basis-2/3"
                dangerouslySetInnerHTML={{
                    __html: notes ? notes.text.toString() : "",
                }}
            ></div>
            <div
                className="p-4 md:basis-1/3 select-none"
                dangerouslySetInnerHTML={{
                    __html: notes ? notes.tableOfContents.toString() : "",
                }}
            ></div>
        </div>
    );
};

const Post = ({ notes }: Props) => {
    const router = useRouter();
    const { title } = router.query;
    useEffect(() => {}, []);
    return (
        <>
            {notes ? (
                <NotesComponent title={title} notes={notes}></NotesComponent>
            ) : (
                <div>Error</div>
            )}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    let url = "http://localhost:3006/notes";
    let title: string | undefined | string[] = context.params?.title;
    let notes: Notes | null = null;

    await fetch(url + "/" + title, {
        method: "get",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            if (res && res.length > 0) {
                notes = res[0];
            } else {
                console.log("abort");
                return {
                    notFound: true,
                };
            }
        });

    return {
        props: {
            notes,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let notes: Notes[] = [];
    let url = "http://localhost:3006";
    await fetch(url + "/notes", {
        method: "get",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            if (res) {
                notes = res.notes;
            }
        });

    const paths = notes.map((note) => ({
        params: {
            title: note.toString().replace("-", " "),
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

export default Post;
