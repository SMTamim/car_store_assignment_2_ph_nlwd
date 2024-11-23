import { Response } from 'express';

// helper method to send generic success response
const sendSuccessResponse = (res: Response, obj: Record<string, unknown>): Response => {
  return res.status(200).json({ success: true, ...obj });
};

// helper method to send generic error response
const sendErrorResponse = (
  res: Response,
  errorObj?: Record<string, unknown> | Error,
  errorMessage: string = '',
  status: number = 500,
): Response => {
  // if error is an actual error
  if (errorObj instanceof Error) {
    return res.status(status).json({
      success: false,
      message: errorObj.message || 'Something went wrong!',
      error: errorMessage,
      stack: errorObj.stack,
    });
  }
  //   if no error is supplied
  if (errorObj === null) {
    return res.status(status).json({
      success: false,
      message: 'Internal Server Error',
      error: 'An unknown error occurred.',
      stack: 'No viewable stack',
    });
  }

  //   if error supplied with a custom object
  return res.status(status).json({
    success: false,
    message: errorMessage || 'An error occurred.',
    ...errorObj,
  });
};

export const Helpers = {
  sendSuccessResponse,
  sendErrorResponse,
};
