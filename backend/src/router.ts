import { Router } from 'express';
import { body } from 'express-validator';
import {
  createAccount,
  getUser,
  getUsers,
  loginUser,
  updateUser,
  uploadImage,
} from './handlers';
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';
const router = Router();

// Routing
router.get('/', (req, res) => {
  res.send('Hello World with Express and TypeScript');
});

// Get all users
router.get('/users', getUsers);
router.get('/user', authenticate, getUser);
router.patch(
  '/user',
  body('handle').notEmpty().withMessage('The handle must not be empty'),
  body('description').notEmpty().withMessage('Complete the description'),
  handleInputErrors,
  authenticate,
  updateUser
);

// Auth and Register and check user input before creating the account
router.post(
  '/auth/register',
  body('handle').notEmpty().withMessage('The handle must not be empty'),
  body('name').notEmpty().withMessage('The name must not be empty'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage(
      'The password must not be empty and need to have more than 6 characters'
    ),
  handleInputErrors,
  createAccount
);

// User Login
router.post(
  '/auth/login',
  body('email').isEmail().notEmpty().withMessage('Incorrect/empty email field'),
  body('password').notEmpty().withMessage('Empty password field'),
  handleInputErrors,
  loginUser
);

router.post('/user/image', authenticate, uploadImage);

export default router;
