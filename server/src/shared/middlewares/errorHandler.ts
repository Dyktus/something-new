import {NextFunction, Request, Response} from "express";
import {BaseException} from "../exceptions/BaseException";

export const errorHandler =
    (err: any, req: Request, res: Response, next: NextFunction) => {

        if (err instanceof BaseException) {
            res.status(err.getHttpCode()).json({
                status: 'error',
                message: err.message,
                stack: process.env.APP_ENV === 'development' ? err.stack : undefined, // Dodajemy stacktrace tylko w środowisku deweloperskim
            });
        } else if (err instanceof Error) {
            res.status(500).json({
                status: 'error',
                message: err.message,
                stack: process.env.APP_ENV === 'development' ? err.stack : undefined, // Dodajemy stacktrace tylko w środowisku deweloperskim
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Unknown error',
            });
        }
    }
