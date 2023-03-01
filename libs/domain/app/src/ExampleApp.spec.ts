import {
    ANON_USER,
    AUTHORIZATION as authorization,
    UserRepository,
} from "@domain/operations";
import { PrismaClient } from "@prisma/client";
import { isRight } from "fp-ts/lib/Either";
import * as RTE from "fp-ts/ReaderTaskEither";
import { PrismaUserRepository } from "./db";
import { Deps, ExampleApp } from "./ExampleApp";

const prisma = new PrismaClient();

describe("Given an MVP app", () => {
    let target: ExampleApp;
    let userRepository: UserRepository;
    let deps: Deps;

    beforeAll(async () => {
        userRepository = PrismaUserRepository({ prisma });
    });

    beforeEach(async () => {
        deps = {
            prisma,
            anonUser: ANON_USER,
            authorization,
            userRepository,
        };
        target = new ExampleApp(deps);

        await target.start()();
    });

    describe("When hello", () => {
        test(" Then hello", async () => {
            const result = await target.hello(
                RTE.right({
                    currentUser: ANON_USER,
                    data: {
                        id: ANON_USER.id,
                    },
                })
            )(deps)();

            expect(isRight(result)).toBeTruthy();
        });
    });
});
