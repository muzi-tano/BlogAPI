import { Router } from "express";
import * as authControler from '../controller/auth.controller'
export const authRouter = Router();
import { privateRoute } from "../middlewares/private-route";

authRouter.post ('/signin', authControler.signIn);
authRouter.post ('/signup', authControler.signUp);
authRouter.post ('/validate', privateRoute, authControler.validate);