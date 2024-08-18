import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/userModel';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error,
    });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email } = req.body;

  try {
    const newUser = new User({ firstName, lastName, email });
    await newUser.save();
    res.status(201).json({
      status: 'success',
      message: 'User added successfully',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};