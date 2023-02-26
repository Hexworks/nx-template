import {
    CreateExpressContextOptions,
    createExpressMiddleware,
} from "@trpc/server/adapters/express";
import express from "express";
import * as path from "path";
import { appRouter } from "./trpc";

const createContext = ({ req, res }: CreateExpressContextOptions) => ({}); // no context

const app = express();

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(
    "/trpc",
    createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
