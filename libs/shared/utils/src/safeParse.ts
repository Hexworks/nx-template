import { ZodParseError } from "@shared/types";
import * as TE from "fp-ts/TaskEither";
import * as z from "zod";

/**
 * This function acts as a wrapper between funcional pipelines and zod's parse function.
 * Example usage:
 * ```ts
 * pipe(
 *     👇 something that returns the object you want to parse
 *     walletRepository.moveFunds(update),
 *     👇 this function will return a function that accepts the object to parse and will use the supplied codec to parse it
 *     TE.chainW(safeParse(WALLET_CODEC)),
 * )
 * ```
 */
export const safeParse =
    <T>(schema: z.Schema) =>
    (data: unknown): TE.TaskEither<ZodParseError, T> => {
        return TE.tryCatch(
            async () => {
                return schema.parseAsync(data);
            },
            (cause) => new ZodParseError({ cause })
        );
    };
