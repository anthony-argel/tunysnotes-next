import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Key, useCallback, useEffect, useState } from "react";
import TopicList from "../../components/TopicsList";

type Notes = {
    _id: Key | null | undefined;
    title: String;
    text: String;
    date: String;
    tableOfContents: String;
    isVisible: boolean;
};

type Sections = {
    sections: Notes[];
    loggedIn: boolean;
    api: string;
};

const Topic = ({ sections, loggedIn, api }: Sections) => {
    const router = useRouter();
    const { topic } = router.query;
    const [adminSections, setAdminSections] = useState<Notes[]>([]);

    const getAdminView = useCallback(() => {
        fetch(api + "/admin/topic/" + topic, {
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
                    setAdminSections(res);
                }
            });
    }, [api, topic]);

    useEffect(() => {
        if (loggedIn) {
            getAdminView();
        }
    }, [loggedIn, getAdminView]);

    return (
        <div className="flex justify-center flex-col items-center gap-5">
            {!loggedIn ? (
                <TopicList
                    sections={sections}
                    loggedIn={loggedIn}
                    api={api}
                    getAdminView={() => {
                        getAdminView();
                    }}
                />
            ) : (
                <TopicList
                    sections={adminSections}
                    loggedIn={loggedIn}
                    api={api}
                    getAdminView={() => {
                        getAdminView();
                    }}
                />
            )}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    let url = "http://localhost:3006/topic";
    let topic: string | undefined | string[] = context.params?.topic;
    let sections: Notes[] = [];

    await fetch(url + "/" + topic, {
        method: "get",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            if (res) {
                sections = res;
            }
        });

    return {
        props: {
            sections,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let topics: string[] = [];
    let url = "http://localhost:3006";
    await fetch(url + "/topic/unique", {
        method: "get",
    })
        .then((res) => {
            if (res.status !== 400 && res.status !== 500) {
                return res.json();
            }
        })
        .then((res) => {
            if (res) {
                topics = res.topics;
            }
        });

    const paths = topics.map((topic) => ({
        params: {
            topic: topic.toString(),
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

export default Topic;
