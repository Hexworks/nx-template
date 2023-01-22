import { ProgramErrorBase } from "@hexworks/cobalt-data";

export class EntityNotFoundError extends ProgramErrorBase<"EntityNotFoundError"> {
    constructor({ id, type }: { id: string; type: string }) {
        super({
            __tag: "EntityNotFoundError",
            message: `${type} with id ${id} not found`,
        });
    }
}
