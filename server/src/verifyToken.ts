import Express from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Express.Request, res: Express.Response, next: Express.NextFunction){
    
    const token = req.header("auth-token");
    
    if(!token){
        res.status(401).end("Access Denied!");
        return;
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
        next();
    }
    catch(err){
        res.end("Invalid token!");
        return;
    }
    
}