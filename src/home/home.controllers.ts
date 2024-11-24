/**
 * Home Controllers
 */

import { Request, Response } from 'express';
import { Helpers } from '../helper';

// default index / route
const index = (req: Request, res: Response) => {
  try {
    Helpers.sendSuccessResponse(res, {
      message: 'Car store backend is working!',
    });
  } catch (error) {
    Helpers.sendErrorResponse(res, error as Error);
  }
};

export const HomeControllers = {
  index,
};
