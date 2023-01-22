import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import type { AppRouter } from "../../backend";

const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
    return `http://localhost:${process.env.PORT ?? 4200}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            transformer: superjson,
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" &&
                            opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    fetch: (url, options) => {
                        let finalOptions = {
                            ...options,
                        };
                        if (process.env.NEXT_PUBLIC_ENABLE_CORS) {
                            finalOptions = {
                                ...finalOptions,
                                credentials: "include",
                            };
                        }
                        return fetch(url, finalOptions);
                    },
                }),
            ],
        };
    },
    ssr: false,
});
