import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import React, { Key, useCallback, useEffect, useState } from "react";

type Notes = {
    _id: Key | null | undefined;
    title: String;
    text: String;
    date: String;
    tableOfContents: String;
    isVisible: boolean;
};

type Sections = {
    initialSections: Notes[];
    loggedIn: boolean;
    api: string;
};
const Topic = ({ initialSections, loggedIn, api }: Sections) => {
    const router = useRouter();
    const { topic } = router.query;
    const [sections, setSections] = useState<Notes[]>([...initialSections]);

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
                setSections(res);
            });
    }, [api, topic]);

    useEffect(() => {
        if (loggedIn) {
            getAdminView();
        }
    }, [loggedIn, getAdminView]);

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
                getAdminView();
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
                getAdminView();
            }
        });
    }

    return (
        <div className="flex justify-center flex-col items-center gap-5">
            {sections && sections.length > 0
                ? sections.map((notes, index) => {
                      return (
                          <div
                              key={notes ? notes._id : 1}
                              className={
                                  index === 0
                                      ? "w-3/5 p-4 m-3"
                                      : "w-3/5 p-5 m-3 rounded shadow-xl"
                              }
                          >
                              <h2>{notes.title}</h2>
                              <div
                                  dangerouslySetInnerHTML={{
                                      __html: notes.text.toString(),
                                  }}
                              ></div>
                              <div className="flex gap-4">
                                  {loggedIn ? (
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
                                          {notes.isVisible ? (
                                              <p>Hide section</p>
                                          ) : (
                                              <p>Show section</p>
                                          )}
                                      </button>
                                  ) : null}

                                  {notes && notes.isVisible === true
                                      ? null
                                      : "admin only"}
                                  {loggedIn ? (
                                      <button
                                          className="bg-rose-900 text-white p-3 rounded"
                                          onClick={(e) => {
                                              if (notes && notes._id) {
                                                  deletePost(
                                                      e,
                                                      notes._id.toString()
                                                  );
                                              }
                                          }}
                                      >
                                          Delete
                                      </button>
                                  ) : null}
                              </div>
                          </div>
                      );
                  })
                : null}
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
            initialSections: sections,
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
