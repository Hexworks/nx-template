export const Role = {
    Anonymous: "Anonymous",
    User: "User",
    Administrator: "Administrator",
} as const;

export type Role = keyof typeof Role;
