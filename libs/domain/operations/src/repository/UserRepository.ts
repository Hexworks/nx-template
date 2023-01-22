import { User } from "@prisma/client";
import { DatabaseError, EntityNotFoundError } from "@shared/types";
import * as TE from "fp-ts/TaskEither";

export type UserRepository = {
    findById: (
        id: string
    ) => TE.TaskEither<DatabaseError | EntityNotFoundError, User>;
    upsert: (user: User) => TE.TaskEither<DatabaseError, User>;
    update: (user: User) => TE.TaskEither<DatabaseError, User>;
};
