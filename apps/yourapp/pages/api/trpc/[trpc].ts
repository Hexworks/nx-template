import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter, createContext } from "../../../backend";

import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

const trpcHandler = createNextApiHandler({
    router: appRouter,
    createContext,
});

const CORS_ENABLED = process.env.ENABLE_CORS === "true";

const apiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (CORS_ENABLED) {
        await NextCors(req, res, {
            // Options
            methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
            origin: "*",
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
    }

    trpcHandler(req, res);
};

export default apiHandler;
