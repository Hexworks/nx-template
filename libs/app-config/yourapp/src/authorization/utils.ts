/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AuthorizedOperation,
    Context,
    Operation,
    Permission,
    Policy,
} from "@hexworks/cobalt-authorization";
import * as TE from "fp-ts/TaskEither";

export type OperationFactory = (...args: any[]) => Operation<any, any>;

export const allowAllPolicy =
    <I>(): Policy<I> =>
    (context: Context<I>) =>
        TE.right(context);

export const allow = <T extends OperationFactory>(opFn: T): PermissionOf<T> => {
    return {
        name: `Allow ${opFn.name} for all`,
        operationName: opFn.name,
        policies: [allowAllPolicy()],
    } as PermissionOf<T>;
};

export type PermissionOf<T> = T extends (
    ...args: any[]
) => Operation<infer I, infer O>
    ? Permission<I, O>
    : never;

export type AuthorizedOperationOf<T> = T extends (
    ...args: any[]
) => Operation<infer I, infer O>
    ? AuthorizedOperation<I, O>
    : never;
