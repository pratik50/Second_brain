import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import "dotenv/config";

export const userMiddeleWare = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers["authorization"];
    const decoded = jwt.verify(header!, process.env.JWT_PASSWORD!);

    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next()
    }else{
        res.status(403).json({
            message: "You are not logged In"
        })
    }
}