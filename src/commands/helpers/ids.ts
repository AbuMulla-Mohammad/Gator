import { UUID } from "node:crypto";
import { validate as isUUID } from "uuid";

export function toUUID(stringId: string): UUID{
    if (!isUUID(stringId))
        throw new Error("Invalid UUID Id");
    return stringId as UUID;
}