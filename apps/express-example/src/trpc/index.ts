import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { pipe } from "fp-ts/function";
import { CuidDto } from "@shared/types";
import { ANON_USER } from "@domain/operations";

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

export const authRouter = router({
    getSession: t.procedure.query(({ ctx }) => {
        return ctx.session;
    }),
});

const createAnonRoutes = () =>
    router({
        hello: publicProcedure
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

// export const execute =
//     <I, O>(ao: AuthorizedOperation<I, O>) =>
//     async (input: Context<I>): Promise<O> => {
//         const result = await ao(TE.right(input))();
//         if (result._tag === "Left") {
//             throw new TRPCError({
//                 code:
//                     result.left.__tag === "AuthorizationError"
//                         ? "UNAUTHORIZED"
//                         : "INTERNAL_SERVER_ERROR",
//                 message: result.left.message,
//                 cause: result.left,
//             });
//         } else {
//             return result.right.data;
//         }
//     };
