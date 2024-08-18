import { Request, Response, NextFunction } from 'express';
import errorHandler from '../middleware/errorHandler';

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockRequest = () => ({}) as Request;
const mockNext = jest.fn() as NextFunction;

describe('Error Handler Middleware', () => {
  it('should handle ValidationError correctly', () => {
    const err = {
      name: 'ValidationError',
      errors: {
        firstName: { message: 'First name is required' },
        lastName: { message: 'Last name is required' },
      },
    };
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext;

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      errors: {
        firstName: 'First name is required',
        lastName: 'Last name is required',
      },
    });
  });

  it('should handle MongoError with code 11000 correctly', () => {
    const err = {
      name: 'MongoError',
      code: 11000,
    };
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext;

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Email already exists',
    });
  });

  it('should handle unexpected errors', () => {
    const err = new Error('Something went wrong');
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext;

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'An unexpected error occurred',
    });
  });
});
