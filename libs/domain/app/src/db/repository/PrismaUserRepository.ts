import { UserRepository, UserUpdate } from "@domain/operations";
import { PrismaClient } from "@prisma/client";
import { DatabaseError, EntityNotFoundError } from "@shared/types";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

type Deps = {
    prisma: PrismaClient;
};

export const PrismaUserRepository = ({ prisma }: Deps): UserRepository => ({
    findById: (id) => {
        return pipe(
            TE.tryCatch(
                () => {
                    return prisma.user.findUnique({
                        where: { id },
                    });
                },
                (e) =>
                    new DatabaseError({
                        operation: "Find user by id",
                        error: e,
                    })
            ),
            TE.chainW((user) => {
                return user
                    ? TE.right(user)
                    : TE.left(new EntityNotFoundError({ id, type: "User" }));
            })
        );
    },
    upsert: (user) => {
        return pipe(
            TE.tryCatch(
                () => {
                    return prisma.user.upsert({
                        where: { id: user.id },
                        update: user,
                        create: user,
                    });
                },
                (e) =>
                    new DatabaseError({
                        operation: "Upsert user",
                        error: e,
                    })
            )
        );
    },
    update: (user: UserUpdate) => {
        //* 👇 These are the fields that can't be updated
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return pipe(
            TE.tryCatch(
                () => {
                    return prisma.user.update({
                        where: { id: user.id },
                        data: user,
                    });
                },
                (e) =>
                    new DatabaseError({
                        operation: "Update user",
                        error: e,
                    })
            )
        );
    },
});
