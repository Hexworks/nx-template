import {
    YourApp,
    AUTHORIZATION as authorization,
    PrismaUserRepository,
} from "@app-config/yourapp";
import { ANON_USER } from "@domain/operations";
import { PrismaClient } from "@prisma/client";
import { CuidDto } from "@shared/types";
import { pipe } from "fp-ts/lib/function";
import { execute } from "../authorization";
import { authenticatedProcedure, t } from "../trpc/trpc";

const prisma = new PrismaClient();

export const YOUR_APP = new YourApp({
    authorization,
    prisma,
    userRepository: PrismaUserRepository({ prisma }),
});

YOUR_APP.start()();

export const authRouter = t.router({
    getSession: t.procedure.query(({ ctx }) => {
        return ctx.session;
    }),
});

const createAnonRoutes = () =>
    t.router({
        hello: t.procedure
            .input(CuidDto)
            .query(({ input }): Promise<string> => {
                return pipe(
                    {
                        currentUser: ANON_USER,
                        data: input,
                    },
                    execute(YOUR_APP.hello)
                );
            }),
    });

export const appRouter = t.router({
    auth: authRouter,
    anon: createAnonRoutes(),
});

// export type definition of API
export type AppRouter = typeof appRouter;
