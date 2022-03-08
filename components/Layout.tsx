import { ReactNode } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Nav></Nav>
            <main style={{ minHeight: "95vh" }}>{children}</main>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
