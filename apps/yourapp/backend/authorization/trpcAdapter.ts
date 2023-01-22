import {
    AuthorizedOperation,
    Context,
    User,
} from "@hexworks/cobalt-authorization";
import { TRPCError } from "@trpc/server";
import * as TE from "fp-ts/TaskEither";
import { Session } from "next-auth";

/**
 * This function adapts an authorized operation to a trpc procedure.
 * It will wrap the possible errors in a trpc error
 */
export const execute =
    <I, O>(ao: AuthorizedOperation<I, O>) =>
    async (input: Context<I>): Promise<O> => {
        const result = await ao(TE.right(input))();
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

/**
 * Converts the Session's user to a User type for the authorization library.
 */
export const getUser = (context: { session: Session }): User<string> => {
    const user = context.session.user;
    return {
        id: user.id,
        name: user.name,
        roles: user.roles,
    };
};
