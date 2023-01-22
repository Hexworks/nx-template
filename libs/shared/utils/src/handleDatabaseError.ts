import { DatabaseError } from "@shared/types";
import { Logger } from "tslog";

export const handleDatabaseError = ({
    error,
    logger,
    operation,
}: {
    error: unknown;
    logger: Logger;
    operation: string;
}): DatabaseError => {
    logger.error(`Operation '${operation}' failed`, error);
    return new DatabaseError({
        operation,
        error,
    });
};
