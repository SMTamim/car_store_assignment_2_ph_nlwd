import { Response } from 'express';

// helper method to send generic success response
const sendSuccessResponse = (res: Response, obj: Record<string, unknown>): Response => {
  return res.status(200).json({ success: true, ...obj });
};

// helper method to send generic error response
export const sendErrorResponse = (res: Response, error: Error | string, status: number = 500): Response => {
  let errorMessage = '';
  let stack = null;

  if (error instanceof Error) {
    errorMessage = error.message || 'An unknown error occurred.';
    // stack = process.env.NODE_ENV === 'development' ? error.stack : undefined;
    stack = error.stack;
    if (error.name === 'ZodError') {
      errorMessage = JSON.parse(error.message)[0].message;
    }
  } else {
    errorMessage = typeof error === 'string' ? error : 'An unknown error occurred.';
  }
  return res.status(status).json({
    message: errorMessage,
    success: false,
    error: error instanceof Error ? error.name : 'ApplicationError',
    stack,
  });
};

export const Helpers = {
  sendSuccessResponse,
  sendErrorResponse,
};
