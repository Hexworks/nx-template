/* eslint-disable @typescript-eslint/no-explicit-any */
import { ANON_USER, Hello, User, UserRepository } from "@domain/operations";
import { Authorization, authorize } from "@hexworks/cobalt-authorization";
import { PrismaClient } from "@prisma/client";
import { createLogger } from "@shared/utils";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { AuthorizedOperationOf } from "./authorization";
import process from "process";

type Deps = {
    prisma: PrismaClient;
    authorization: Authorization;
    userRepository: UserRepository;

    anonUser?: User;
};

export class YourApp {
    public prisma: PrismaClient;

    public hello: AuthorizedOperationOf<typeof Hello>;

    private logger = createLogger("InvestorApp");
    private anonUser: User;
    private userRepository: UserRepository;

    constructor({
        prisma,
        authorization,
        userRepository,
        anonUser = ANON_USER,
    }: Deps) {
        this.prisma = prisma;
        this.anonUser = anonUser;
        this.userRepository = userRepository;
        this.hello = authorize(Hello({ userRepository }), authorization);
    }

    public start() {
        return pipe(
            this.postConstruct(),
            TE.map(() => {
                this.logger.info("Post-startup initialization complete");
                return undefined;
            }),
            TE.orElseW((e) => {
                this.logger.error("Post-startup initialization failed", e);
                return this.stop();
            })
        );
    }

    public stop(): never {
        process.exit(1);
    }

    private postConstruct() {
        return pipe(
            TE.Do,
            TE.bind("anonUser", () => this.ensureAnonUserExists())
        );
    }
    private ensureAnonUserExists() {
        return this.userRepository.upsert(ANON_USER);
    }
}
