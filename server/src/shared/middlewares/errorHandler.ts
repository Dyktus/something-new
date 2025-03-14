import {NextFunction, Request, Response} from "express";

export const errorHandler =
    (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof Error) {
            // @ToDo support different http status codes
            res.status(500).json({
                status: 'error',
                message: err.message,
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Dodajemy stacktrace tylko w środowisku deweloperskim
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Unknown error',
            });
        }
    }
