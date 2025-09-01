import { ZodObject } from 'zod';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export const validate = (model: ZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = model.parse(req.body);
      next();
    } catch (err: any) {
      next(createError(400, err.errors?.[0]?.message ?? 'Validation error'));
    }
  };
