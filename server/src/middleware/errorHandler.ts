import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ValidationError') {
    const errors = Object.keys(err.errors).reduce((acc: any, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {});

    return res.status(400).json({
      status: 'fail',
      errors,
    });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).json({
      status: 'fail',
      message: 'Email already exists',
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred',
  });
};

export default errorHandler;