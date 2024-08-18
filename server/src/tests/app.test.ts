import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

jest.mock('mongoose');

describe('Express App', () => {
  beforeAll(() => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce('MongoDB connected');
  });

  it('should connect to MongoDB', async () => {
    expect(mongoose.connect).toHaveBeenCalledWith(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/default'
    );
  });

  it('should respond with a 404 for undefined routes', async () => {
    const response = await request(app).get('/undefined-route');
    expect(response.status).toBe(404);
  });

  it('should have the correct referrer policy header', async () => {
    const response = await request(app).get('/user');
    expect(response.headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  });
});
