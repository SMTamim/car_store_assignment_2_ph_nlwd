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
    if (error instanceof Error) {
      Helpers.sendErrorResponse(res, error, 'Some error occurred!');
    } else {
      Helpers.sendErrorResponse(res);
    }
  }
};

export const HomeControllers = {
  index,
};
