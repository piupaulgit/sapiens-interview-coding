import { Router } from 'express';
import { body } from 'express-validator';
import { addUser, getAllUsers } from '../controllers/userController';

const router = Router();

const validateUser = [
  body('firstName')
    .isAlpha().withMessage('First name must contain only alphabetical characters')
    .isLength({ max: 100 }).withMessage('First name must be at most 100 characters long'),
  body('lastName')
    .isAlpha().withMessage('Last name must contain only alphabetical characters')
    .isLength({ max: 100 }).withMessage('Last name must be at most 100 characters long'),
  body('email')
    .isEmail().withMessage('Must be a valid email address'),
];

router.get('/', getAllUsers);
router.post('/add', validateUser, addUser);

export default router;