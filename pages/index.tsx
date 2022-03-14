import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <div className=" flex justify-center min-h-screen ">
            <div className="md:w-9/12 text-center flex flex-col justify-center items-center gap-4 p-4">
                <h1 className="text-6xl">Tuny&#39;s Notes</h1>
                <p>
                    A place to share my current and future knowledge about
                    mathematics, Japanese, and computer science with you
                </p>
            </div>
        </div>
    );
};

export default Home;
