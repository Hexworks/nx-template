import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

const Home = dynamic(() => import("../frontend/routes/Home"), {
    ssr: false,
});

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Yourapp</title>
                <meta name="description" content="Your app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Home />
            </div>
        </>
    );
};

export default Index;
