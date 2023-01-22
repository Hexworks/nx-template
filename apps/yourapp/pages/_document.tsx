import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html data-theme="corporate">
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#000000" />
                <base href="/" />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/public/favicon.ico"
                />
                <link rel="shortcut icon" href="/public/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <body>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
