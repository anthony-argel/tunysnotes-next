import { ReactNode } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

type Props = {
    children: ReactNode;
    loggedIn: boolean;
    api: string;
};

const Layout = ({ children, loggedIn }: Props) => {
    return (
        <div>
            <Nav loggedIn={loggedIn}></Nav>
            <main style={{ minHeight: "95vh" }}>{children}</main>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
