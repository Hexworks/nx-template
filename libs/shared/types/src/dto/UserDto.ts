import { z } from "zod";

export const UserDto = z.object({
    id: z.string().cuid2(),
    name: z.string().min(1),
    email: z.string().email(),
    roles: z.array(z.string().min(1)),
    createdAt: z.date(),
});

export type UserDto = z.infer<typeof UserDto>;
