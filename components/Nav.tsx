import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type Props = {
    loggedIn: boolean;
};

const Nav = ({ loggedIn }: Props) => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const dropDownMenu = () => {
        return (
            <div className="cursor-pointer relative">
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
                        <Link href="discrete-math">
                            <a>Discrete Math</a>
                        </Link>
                    </li>
                    <li className="p-4">Japanese</li>
                </ul>
            </div>
        );
    };

    return (
        <nav className="bg-stone-800 text-white flex justify-between">
            <ul className="flex relative">
                <li className="m-4">
                    <Link href="/">Tuny&#39;s Notes</Link>
                </li>
                {loggedIn === true ? (
                    <li className="m-4">
                        <Link href="/create">
                            <a>Create</a>
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
            <p className="m-4 text-stone-800">
                <Link href="/login">
                    <a>Log in</a>
                </Link>
            </p>
        </nav>
    );
};
export default Nav;
