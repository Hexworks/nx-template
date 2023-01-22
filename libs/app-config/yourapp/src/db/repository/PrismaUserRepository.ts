import { UserRepository } from "@domain/operations";
import { PrismaClient, User } from "@prisma/client";
import { DatabaseError, EntityNotFoundError } from "@shared/types";
import { createLogger } from "@shared/utils";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { Logger } from "tslog";

type Deps = {
    prisma: PrismaClient;
    logger?: Logger;
};

export const PrismaUserRepository = ({
    prisma,
    logger = createLogger("PrismaUserRepository"),
}: Deps): UserRepository => ({
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
        return TE.tryCatch(
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
        );
    },
    update: (user: User) => {
        //* 👇 These are the fields that can't be updated
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, name, email, roles, createdAt, ...data } = user;
        return TE.tryCatch(
            () => {
                return prisma.user.update({
                    where: { id },
                    data,
                });
            },
            (e) =>
                new DatabaseError({
                    operation: "Update user",
                    error: e,
                })
        );
    },
});
