import {NextFunction, Request, Response} from "express";

export const wrapController = (controllerMethod: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await controllerMethod(req, res, next);

            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    };
};
