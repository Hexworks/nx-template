import { z } from "zod";

export const CuidDto = z.object({
    id: z.string().cuid(),
});

/**
 * Dto that contains a single cuid.
 */
export type CuidDto = z.infer<typeof CuidDto>;
