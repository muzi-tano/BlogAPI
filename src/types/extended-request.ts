import { User } from '@prisma/client';
import { Request } from 'express';

type UserWithoutPassword = Omit<User, 'password'>;

export interface ExtendedRequest extends Request {
    user?: UserWithoutPassword;
}