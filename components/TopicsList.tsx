import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
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

type Props = {
    sections: Notes[];
    loggedIn: boolean;
    api: string;
    getAdminView: () => void;
};

const TopicList = ({ sections, loggedIn, api, getAdminView }: Props) => {
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
        <>
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
                              <div className="flex gap-4 items-center flex-wrap">
                                  {loggedIn ? (
                                      <Link href={"/edit/" + notes._id}>
                                          <a className="bg-lime-900 text-white p-3 rounded">
                                              Edit
                                          </a>
                                      </Link>
                                  ) : null}
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
                                              <p>Hide</p>
                                          ) : (
                                              <p>Show</p>
                                          )}
                                      </button>
                                  ) : null}

                                  {notes && notes.isVisible === true
                                      ? "users"
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
        </>
    );
};

export default TopicList;
