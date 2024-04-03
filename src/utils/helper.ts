import { body, check } from 'express-validator';

export const signupValidator = [
    body('firstName','firstname is required').notEmpty(),
    body('lastName','lastname is required').notEmpty(),
    body('age','age is required').notEmpty(),
    body('email', 'email is required').notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
    check('role').isIn(['admin', 'user']).withMessage('role must be admin | user ')
]
   
export const loginValidator = [
    body('email', 'email is required').notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
    check('role').isIn(['admin', 'user']).withMessage('role must be admin | user ')
]

export const editProfileValidator = [
    body('email', 'email is required').notEmpty(),
    body('email', 'Invalid email').isEmail()
]
