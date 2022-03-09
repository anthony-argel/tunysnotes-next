import React, { useState, useEffect, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import Head from "next/head";

type Props = {
    api: string;
    loggedIn: boolean;
};

const PostForm = ({ api, loggedIn }: Props) => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [post, setPost] = useState("");
    const [table, setTable] = useState("");
    const [error, setError] = useState(false);
    const [posted, setPosted] = useState(false);

    const submitPost = (e: React.MouseEvent<HTMLFormElement>) => {
        if (title === "" || post === "" || table === "") {
            e.preventDefault();
            setError(true);
            return;
        }
        if (api !== "") {
            e.preventDefault();
            fetch(api + "/admin/notes", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    text: post,
                    tag,
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
                                required
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

export default PostForm;
