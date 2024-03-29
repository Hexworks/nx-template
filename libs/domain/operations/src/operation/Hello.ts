import {
    Operation,
    OperationDependencies,
} from "@hexworks/cobalt-authorization";
import { CuidDto } from "@shared/types";
import { pipe } from "fp-ts/lib/function";
import {
    ask,
    chain,
    chainW,
    fromTaskEither,
    right,
} from "fp-ts/ReaderTaskEither";
import { UserRepository } from "../repository";

type Deps = OperationDependencies & {
    userRepository: UserRepository;
};

export const Hello: Operation<CuidDto, string, Deps> = ({ id }) => {
    return pipe(
        ask<Deps>(),
        chainW(({ userRepository }) =>
            fromTaskEither(userRepository.findById(id))
        ),
        chain((existingUser) => {
            return right(`Hello, ${existingUser.name}!`);
        })
    );
};
