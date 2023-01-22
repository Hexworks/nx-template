import { ANON_USER } from "@domain/operations";
import { FunctionComponent } from "react";
import { trpc } from "../trpc";

const Home: FunctionComponent = () => {
    const hello = trpc.anon.hello.useQuery({ id: ANON_USER.id });

    return (
        <article className="prose prose-slate lg:prose-xl max-w-none p-4 bg-base-100 shadow-xl rounded shadow-base-300">
            <h1>Hello</h1>
            <p>
                {hello.isLoading
                    ? "Loading..."
                    : hello.isError
                    ? hello.error.message
                    : hello.data}
            </p>
        </article>
    );
};

export default Home;
