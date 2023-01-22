/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GetServerSidePropsContext } from "next";
import { unstable_getServerSession, type NextAuthOptions } from "next-auth";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { YOUR_APP } from "../routes";

export const authOptions: NextAuthOptions = {
    callbacks: {
        /**
         * The `user` comes from the `profile` function above, here
         * the `session`'s `user` can be enhanced with the additional fields.
         */
        session: ({ session, user }) => {
            if (session.user) {
                session.user.id = user.id;
                session.user.roles = user.roles;
            }
            return session;
        },
    },
    adapter: PrismaAdapter(YOUR_APP.prisma),
    providers: [],
};

// Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
export const getServerAuthSession = async (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return unstable_getServerSession(ctx.req, ctx.res, authOptions);
};
