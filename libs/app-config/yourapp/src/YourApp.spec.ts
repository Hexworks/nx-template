import { ANON_USER, UserRepository } from "@domain/operations";
import { PrismaClient } from "@prisma/client";
import { isRight } from "fp-ts/lib/Either";
import * as TE from "fp-ts/TaskEither";
import { AUTHORIZATION as authorization } from "./authorization";
import { PrismaUserRepository } from "./db";
import { YourApp } from "./YourApp";

const prisma = new PrismaClient();

describe("Given an MVP app", () => {
    let target: YourApp;

    let userRepository: UserRepository;

    beforeAll(async () => {
        userRepository = PrismaUserRepository({ prisma });
    });

    beforeEach(async () => {
        target = new YourApp({
            prisma,
            authorization,
            userRepository,
        });

        await target.start()();
    });

    describe("When hello", () => {
        test(" Then hello", async () => {
            const result = await target.hello(
                TE.right({
                    currentUser: ANON_USER,
                    data: {
                        id: ANON_USER.id,
                    },
                })
            )();

            expect(isRight(result)).toBeTruthy();
        });
    });
});
