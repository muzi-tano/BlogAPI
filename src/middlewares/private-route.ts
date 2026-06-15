import { NextFunction, Request, Response } from "express"
import { verifyRequest } from "../services/auth.service"
import { ExtendedRequest } from "../types/extended-request"

export const privateRoute = (
    req: ExtendedRequest, 
    res: Response, 
    next: NextFunction) => { 
        const user = await verifyRequest(req)
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        req.user = user
        next()
    }




