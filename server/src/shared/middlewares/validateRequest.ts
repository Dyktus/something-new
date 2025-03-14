import {ZodSchema} from "zod";
import {NextFunction, Request, Response} from "express";

export const validateRequest = (schema: ZodSchema)=> {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.errors,
            });
        }
    }
}
