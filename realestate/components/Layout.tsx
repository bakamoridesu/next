import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";

type LayoutProps = {
    children: ReactElement
}

export const Layout = ({ children }: LayoutProps) => (
    <>
        <Head>
            <title>Real Estate</title>
        </Head>
        <Box maxWidth="1280px" m="auto">
            <header>
                Navbar
            </header>
            <main>
                {children}
            </main>
        </Box>
    </>
)