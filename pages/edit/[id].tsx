import React, { useState, useEffect, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";

type Props = {
    api: string;
    loggedIn: boolean;
};

const PostForm = ({ api, loggedIn }: Props) => {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [post, setPost] = useState("");
    const [table, setTable] = useState("");
    const [error, setError] = useState(false);
    const [posted, setPosted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetch(api + "/admin/notes/id/" + id, {
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
                    setTitle(res.title);
                    setTag(res.tag);
                    setPost(res.text);
                    setTable(res.tableOfContents);
                    setVisible(res.isVisible);
                }
            });
    }, [api, id]);

    const submitPost = (e: React.MouseEvent<HTMLFormElement>) => {
        console.log("submitted?");
        if (title === "" || post === "" || table === "") {
            e.preventDefault();
            setError(true);
            return;
        }
        if (api !== "") {
            e.preventDefault();
            fetch(api + "/admin/notes/" + id, {
                method: "PUT",
                body: JSON.stringify({
                    title,
                    text: post,
                    tag,
                    visible,
                    tableOfContents: table,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                mode: "cors",
            }).then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                }
                if (res.status === 200) {
                    setPosted(true);
                }
            });
        }
    };
    const exitPage = useCallback(() => {
        router.push("/");
    }, [router]);

    useEffect(() => {
        if (loggedIn === false) {
            exitPage();
        }
    }, [loggedIn, exitPage]);

    return (
        <div className="">
            <Head>
                <meta name="robots" content="noindex"></meta>
                <meta name="googlebot" content="noindex"></meta>
            </Head>
            {posted ? exitPage() : null}
            <div className="flex flex-col justify-center items-center p-4">
                <div className="w-11/12">
                    {error ? <p>Form is not completely filled out</p> : null}
                    <form onSubmit={submitPost}>
                        <label htmlFor="title ">
                            Title:
                            <input
                                className="w-full border border-stone-300"
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </label>
                        <label htmlFor="tag ">
                            Tag:
                            <input
                                className="w-full border border-stone-300"
                                type="text"
                                id="tag"
                                name="tag"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            ></input>
                        </label>
                        <p>Post</p>
                        <Editor
                            onEditorChange={(content, editor) =>
                                setPost(content)
                            }
                            value={post ? post : ""}
                            init={{
                                height: 500,
                                menubar: "insert tools",
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount media",
                                ],
                                toolbar:
                                    "undo redo | formatselect | " +
                                    "bold italic backcolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help | code",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        <p>TABLE OF CONTENTS</p>
                        <Editor
                            onEditorChange={(content, editor) =>
                                setTable(content)
                            }
                            value={table ? table : ""}
                            init={{
                                height: 500,
                                menubar: "insert tools",
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount media",
                                ],
                                toolbar:
                                    "undo redo | formatselect | " +
                                    "bold italic backcolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help | code",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        <br></br>
                        <label htmlFor="visible">
                            Visible immediately:
                            <input
                                type="checkbox"
                                id="visible"
                                name="visible"
                                checked={visible}
                                onChange={(e) =>
                                    setVisible(
                                        (previousCheck) => !previousCheck
                                    )
                                }
                            ></input>
                        </label>
                        <br></br>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="p-4 bg-green-800 text-white m-4"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
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

export default PostForm;
