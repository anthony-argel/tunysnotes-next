import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import styles from "../styles/nav.module.css";

type Props = {
    loggedIn: boolean;
};

const Nav = ({ loggedIn }: Props) => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const dropDownMenu = () => {
        return (
            <div className="cursor-pointer relative ">
                <ul className="absolute bg-stone-800">
                    <li
                        className="flex p-4 select-none"
                        onClick={() =>
                            setShowDropDown((previousState) => !previousState)
                        }
                    >
                        Topics
                        <IoMdArrowDropup className="self-center"></IoMdArrowDropup>
                    </li>
                    <li className="p-4">
                        <Link href="/topic/discrete-math">
                            <a
                                className={styles.navlink}
                                onClick={() => setShowDropDown(false)}
                            >
                                Discrete Math
                            </a>
                        </Link>
                    </li>
                    <li className="p-4">
                        <Link href="/topic/japanese">
                            <a
                                className={styles.navlink}
                                onClick={() => setShowDropDown(false)}
                            >
                                Japanese
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <nav className="bg-stone-800 text-white flex justify-between my-nav">
            <ul className="flex relative">
                <li className="m-4">
                    <Link href="/">
                        <a className={styles.navlink}>Tuny&#39;s Notes</a>
                    </Link>
                </li>
                {loggedIn === true ? (
                    <li className="m-4">
                        <Link href="/create">
                            <a className={styles.navlink}>Create</a>
                        </Link>
                    </li>
                ) : null}
                {!showDropDown ? (
                    <li
                        className="flex cursor-pointer m-4"
                        onClick={() =>
                            setShowDropDown((previousState) => !previousState)
                        }
                    >
                        Topics
                        <IoMdArrowDropdown className="self-center"></IoMdArrowDropdown>
                    </li>
                ) : (
                    dropDownMenu()
                )}
            </ul>
            <p className="m-4">
                <Link href="/login">
                    <a className="text-stone-800">Log in</a>
                </Link>
            </p>
        </nav>
    );
};
export default Nav;
