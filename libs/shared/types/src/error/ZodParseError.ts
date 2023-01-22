import { ProgramErrorBase } from "@hexworks/cobalt-data";

export class ZodParseError extends ProgramErrorBase<"ZodParseError"> {
    constructor({ cause }: { cause: unknown }) {
        super({
            __tag: "ZodParseError",
            message: `Zod parsing failed: ${cause}`,
        });
    }
}
