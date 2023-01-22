import { ProgramErrorBase } from "@hexworks/cobalt-data";

export class DatabaseError extends ProgramErrorBase<"DatabaseError"> {
    constructor({ operation, error }: { operation: string; error: unknown }) {
        super({
            __tag: "DatabaseError",
            message: `Operation '${operation}' failed`,
            details: {
                databaseError: error,
            },
        });
    }
}
