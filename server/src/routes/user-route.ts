import express from 'express';
import { body } from 'express-validator';
import {
  checkUserStatus,
  logoutUser,
  loginUser,
  registerUser,
} from '../controllers/user-controller';
import { verifyToken } from '../utils/jwt';

const router = express.Router();

router.post(
  '/register-user',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPass')
      .custom((value, { req }) => {
        if (value !== req.body.password) return false;
        return true;
      })
      .withMessage('Password confirmation should be the same as password'),
  ],
  registerUser
);

router.post(
  '/login-user',
  [body('email').isEmail().normalizeEmail().withMessage('Invalid email')],
  loginUser
);

// router.get('/:id', getUserbyID);
router.get('/user-status', verifyToken, checkUserStatus);
router.get('/logout', verifyToken, logoutUser);
export default router;
