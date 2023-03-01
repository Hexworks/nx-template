import { Deps, ExampleApp, PrismaUserRepository } from "@domain/app";
import { ANON_USER } from "@domain/operations";
import {
    authorize,
    Context as AuthContext,
    Operation,
    OperationDependencies,
} from "@hexworks/cobalt-authorization";
import { PrismaClient } from "@prisma/client";
import { CuidDto } from "@shared/types";
import { initTRPC, TRPCError } from "@trpc/server";
import * as RTE from "fp-ts/ReaderTaskEither";
import superjson from "superjson";
import { AUTHORIZATION } from "../app";

// TODO: move this to a shared lib
interface User {
    id: string;
    name: string;
}

export type Context = {
    session?: Session;
};

export type Session = {
    user?: User;
};

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter: ({ shape }) => {
        return shape;
    },
});

const router = t.router;
const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            ...ctx,
            // infers that `session` is non-nullable to downstream resolvers
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});
// TODO: move this to a shared lib

//* Actual API code
export const authRouter = router({
    getSession: t.procedure.query(({ ctx }) => {
        return ctx.session;
    }),
});

const prisma = new PrismaClient();

export const trpcOperationAdapter =
    <I, O, D extends OperationDependencies>(op: Operation<I, O, D>, deps: D) =>
    async (input: AuthContext<I>) => {
        const result = await authorize(op)(RTE.right(input))(deps)();
        if (result._tag === "Left") {
            throw new TRPCError({
                code:
                    result.left.__tag === "AuthorizationError"
                        ? "UNAUTHORIZED"
                        : "INTERNAL_SERVER_ERROR",
                message: result.left.message,
                cause: result.left,
            });
        } else {
            return result.right.data;
        }
    };

const deps: Deps = {
    anonUser: ANON_USER,
    authorization: AUTHORIZATION,
    prisma: prisma,
    userRepository: PrismaUserRepository({ prisma }),
    adapt: trpcOperationAdapter,
};

const app = new ExampleApp(deps);

const createAnonRoutes = () =>
    router({
        hello: publicProcedure.input(CuidDto).query(({ input }) =>
            app.hello({
                currentUser: ANON_USER,
                data: input,
            })
        ),
    });

export const appRouter = t.router({
    auth: authRouter,
    anon: createAnonRoutes(),
});

// export type definition of API
export type AppRouter = typeof appRouter;
