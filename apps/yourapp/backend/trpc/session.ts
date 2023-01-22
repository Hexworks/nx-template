export type Session = {
    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
        roles: string[];
    };
};
