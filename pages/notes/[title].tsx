import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key, useCallback, useEffect, useState } from "react";
import ErrorPage from "next/error";

type Notes = {
    _id: Key | null | undefined;
    title: String;
    text: String;
    date: String;
    tableOfContents: String;
    isVisible: boolean;
};

type Props = {
    initialNotes: Notes;
    loggedIn: boolean;
    api: string;
};

type NotesProps = {
    notes: Notes;
    title: string | string[] | undefined;
    loggedIn: boolean;
    api: string;
};

const NotesComponent = ({ notes, title, loggedIn, api }: NotesProps) => {
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

const Post = ({ initialNotes, loggedIn, api }: Props) => {
    const [notes, setNotes] = useState<Notes>(initialNotes);
    const router = useRouter();
    const { title } = router.query;

    const adminRefresh = useCallback(() => {
        fetch(api + "/admin/notes/" + title, {
            method: "get",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((res) => {
                if (res) {
                    setNotes(res[0]);
                }
            });
    }, [title, api]);

    useEffect(() => {
        if (loggedIn) {
            adminRefresh();
        }
    }, [loggedIn, adminRefresh]);

    function deletePost(e: React.MouseEvent<HTMLElement>, postId: string) {
        e.preventDefault();
        fetch(api + "/admin/notes/" + postId, {
            method: "delete",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => {
            if (res.ok) {
                router.push("/");
            }
        });
    }

    function toggleVisibility(
        e: React.MouseEvent<HTMLElement>,
        postId: string,
        visibilityValue: string
    ) {
        e.preventDefault();
        fetch(api + "/admin/notes/visible/" + postId + "/" + visibilityValue, {
            method: "put",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => {
            if (res.ok) {
                adminRefresh();
            }
        });
    }

    return (
        <>
            {loggedIn && notes ? (
                <div className="flex gap-4 items-center justify-center m-3">
                    <Link href={"/edit/" + notes._id}>
                        <a className="bg-lime-900 text-white p-3 rounded">
                            Edit
                        </a>
                    </Link>
                    <button
                        className={
                            notes.isVisible
                                ? "bg-emerald-900 text-white p-3 rounded"
                                : "bg-sky-900 text-white p-3 rounded"
                        }
                        onClick={(e) => {
                            if (notes && notes._id) {
                                if (notes.isVisible) {
                                    toggleVisibility(
                                        e,
                                        notes._id.toString(),
                                        "false"
                                    );
                                } else {
                                    toggleVisibility(
                                        e,
                                        notes._id.toString(),
                                        "true"
                                    );
                                }
                            }
                        }}
                    >
                        {notes.isVisible ? <p>Hide</p> : <p>Show</p>}
                    </button>

                    {notes && notes.isVisible === true ? "users" : "admin only"}

                    <button
                        className="bg-rose-900 text-white p-3 rounded"
                        onClick={(e) => {
                            if (notes && notes._id) {
                                deletePost(e, notes._id.toString());
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            ) : null}

            {notes ? (
                <NotesComponent
                    title={title}
                    notes={notes}
                    loggedIn={loggedIn}
                    api={api}
                ></NotesComponent>
            ) : (
                <ErrorPage statusCode={404}></ErrorPage>
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
            initialNotes: notes,
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
