import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [1, 'First name must be at least 1 character long'],
    maxlength: [100, 'First name must be less than 100 characters long'],
    match: [/^[a-zA-Z]+$/, 'First name must contain only alphabetical characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [1, 'Last name must be at least 1 character long'],
    maxlength: [100, 'Last name must be less than 100 characters long'],
    match: [/^[a-zA-Z]+$/, 'Last name must contain only alphabetical characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
});

const User = mongoose.model('User', userSchema);

export default User;