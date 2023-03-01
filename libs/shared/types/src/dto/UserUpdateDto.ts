import { z } from "zod";

export const UserUpdateDto = z.object({
    id: z.string().cuid2(),
    name: z.string().min(1),
    roles: z.array(z.string().min(1)),
});

export type UserUpdateDto = z.infer<typeof UserUpdateDto>;
