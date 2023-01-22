import { Operation } from "@hexworks/cobalt-authorization";
import { CuidDto } from "@shared/types";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { UserRepository } from "../repository";

type Deps = {
    userRepository: UserRepository;
};

export const Hello = ({
    userRepository,
}: Deps): Operation<CuidDto, string> => ({
    name: Hello.name,
    execute: ({ id }) => {
        return pipe(
            userRepository.findById(id),
            TE.chainW((existingUser) => {
                return TE.right(`Hello, ${existingUser.name}!`);
            })
        );
    },
});
