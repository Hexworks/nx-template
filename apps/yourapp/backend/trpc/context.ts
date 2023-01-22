import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Session } from "next-auth";
import { getServerAuthSession } from "../next/auth";

type CreateContextOptions = {
    session: Session | null;
};

/**
 * The tRPC context object that's available in all tRPC endpoints.
 */
export type Context = {
    session: Session | null;
};

/**
 * Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createInnerContext = async (
    opts: CreateContextOptions
): Promise<Context> => {
    return {
        session: opts.session,
    };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
    const { req, res } = opts;

    // Get the session from the server using the unstable_getServerSession wrapper function
    const session = await getServerAuthSession({ req, res });

    return createInnerContext({
        session,
    });
};
