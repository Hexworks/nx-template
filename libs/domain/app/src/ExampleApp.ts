/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hello, UpdateUser, User, UserRepository } from "@domain/operations";
import {
    OperationAdapter,
    OperationDependencies,
    PreparedOperationOf,
} from "@hexworks/cobalt-authorization";
import { PrismaClient } from "@prisma/client";
import { createLogger } from "@shared/utils";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import process from "process";

export type Deps = OperationDependencies & {
    prisma: PrismaClient;
    userRepository: UserRepository;
    anonUser: User;
    adapt: OperationAdapter<any, any, any>;
};

export class ExampleApp {
    private logger = createLogger("ExampleApp");
    private deps: Deps;

    public hello: PreparedOperationOf<typeof Hello>;
    public updateUser: PreparedOperationOf<typeof UpdateUser>;

    constructor(deps: Deps) {
        this.deps = deps;
        this.hello = deps.adapt(Hello, deps);
        this.updateUser = deps.adapt(UpdateUser, deps);
    }

    public start() {
        return pipe(
            TE.Do,
            TE.bind("anonUser", () => this.ensureAnonUserExists()),
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

    private ensureAnonUserExists() {
        const { userRepository, anonUser } = this.deps;
        return userRepository.upsert(anonUser);
    }
}
