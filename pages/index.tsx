import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <div className="bg-emerald-800">
            <Link href="/notes/nut">
                <a>Nut</a>
            </Link>
        </div>
    );
};

export default Home;
