import { Request, Response } from 'express';

const index = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      hello: 'world',
      message: 'Car store backend is working!',
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: e,
    });
  }
};

export const HomeControllers = {
  index,
};
