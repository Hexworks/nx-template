import {
    Operation,
    OperationDependencies,
} from "@hexworks/cobalt-authorization";
import { CuidDto } from "@shared/types";
import { pipe } from "fp-ts/lib/function";
import {
    ask,
    bind,
    bindW,
    chainW,
    Do,
    fromTaskEither,
} from "fp-ts/ReaderTaskEither";
import { UserRepository } from "../repository";
import { User } from "../types";

type Deps = OperationDependencies & {
    userRepository: UserRepository;
};

export const UpdateUser: Operation<CuidDto, User, Deps> = ({ id }) => {
    return pipe(
        Do,
        bind("deps", () => ask<Deps>()),
        bindW("existingUser", ({ deps }) =>
            fromTaskEither(deps.userRepository.findById(id))
        ),
        chainW(({ deps, existingUser }) => {
            return fromTaskEither(deps.userRepository.update(existingUser));
        })
    );
};
