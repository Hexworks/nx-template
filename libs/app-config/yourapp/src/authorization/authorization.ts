/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hello, Role } from "@domain/operations";
import { Authorization } from "@hexworks/cobalt-authorization";
import { allow } from "./utils";

export const AUTHORIZATION: Authorization = {
    roles: {
        [Role.Anonymous]: {
            name: Role.Anonymous,
            permissions: [allow(Hello)],
        },
        [Role.User]: {
            name: Role.User,
            permissions: [allow(Hello)],
        },
        [Role.Administrator]: {
            name: Role.Administrator,
            permissions: [allow(Hello)],
        },
    },
};
