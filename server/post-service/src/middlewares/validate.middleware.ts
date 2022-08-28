import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../core/api-error';

const validate = (schemas: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.all(schemas.map((schema: any) => schema.run(req)));

        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }

        const message = result.array()[0].msg;
        next(new BadRequestError(message));
    } catch (error) {
        next(error);
    }
};

export default validate;
