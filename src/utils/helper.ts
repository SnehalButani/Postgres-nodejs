import { body, check } from 'express-validator';

export const loginValidator = [
    body('firstName','firstname is required').isEmpty(),
    body('lastName','lastname is required').isEmpty(),
    body('age','age is required').isEmpty(),
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
    check('role').isIn(['admin', 'user']).withMessage('role must be admin | user ')
]

export const signupValidator = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
    check('role').isIn(['admin', 'user']).withMessage('role must be admin | user ')
]

