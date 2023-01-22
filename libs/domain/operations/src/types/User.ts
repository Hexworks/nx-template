import { Role } from "./Role";

export type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;

    roles: string[];
    createdAt: Date;
};

export const ANON_USER: User = {
    id: "cl9qt3h0h0000xeodhqf41s9r",
    name: "Anonymous",
    email: "anon@example.com",
    emailVerified: null,
    roles: [Role.Anonymous],
    createdAt: new Date("2021-01-01T00:00:00.000Z"),
};
