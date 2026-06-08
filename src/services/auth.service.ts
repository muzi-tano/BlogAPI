import { User } from "@prisma/client";
import { createJWT } from "../libs/jwt";

export const CreateToken = (user: User) => {
    return createJWT({id: user.id})
}