// 📘 These are taken from the Prisma source code verbatim 👇

import * as z from "zod";

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 */
export type JsonObject = { [Key in string]?: JsonValue };

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export type JsonArray = Array<JsonValue>;

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export type JsonValue =
    | string
    | number
    | boolean
    | JsonObject
    | JsonArray
    | null;

export const JsonObject: z.ZodType<JsonObject> = z.lazy(() =>
    z.record(z.string(), JsonValue.optional())
);

export const JsonValue: z.ZodType<JsonValue> = z.lazy(() =>
    z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.null(),
        JsonObject,
        z.array(JsonValue),
    ])
);
