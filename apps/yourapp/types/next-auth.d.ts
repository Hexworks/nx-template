import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        image: string;
        roles: string[];
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
    }
}
