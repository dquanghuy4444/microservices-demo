import { check } from 'express-validator';

export default class AuthValidator {
    static login = [
        check('username')
            .exists()
            .withMessage('Username is required')
            .isLength({ min: 6 })
            .withMessage('Username must contain at least 6 characters'),
        check('password')
            .exists()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must contain at least 6 characters')
            .matches(/\d/)
            .withMessage('Password must contain a number'),
    ]
    static register = [
        check('username')
            .exists()
            .withMessage('Username is required')
            .isLength({ min: 6 })
            .withMessage('Username must contain at least 6 characters'),
        check('email')
            .exists()
            .withMessage('Email is required')
            .matches(/.+\@.+\..+/)
            .withMessage('Email must contain @')
            .isLength({
                min: 4,
                max: 32
            })
            .withMessage('Email must be between 3 to 32 characters'),
        check('password')
            .exists()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must contain at least 6 characters')
            .matches(/\d/)
            .withMessage('Password must contain a number'),
        check('fullname')
            .exists()
            .withMessage('Full name is required'),
        check('phone_number')
            .exists()
            .withMessage('Phone number is required'),
    ]
    static forgetPassword = [
        check('email')
            .exists()
            .withMessage('Email is required')
            .matches(/.+\@.+\..+/)
            .withMessage('Email must contain @')
            .isLength({
                min: 4,
                max: 32
            })
            .withMessage('Email must be between 3 to 32 characters'),
    ]
    static resetPassword = [
        check('new_password')
            .exists()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must contain at least 6 characters')
            .matches(/\d/)
            .withMessage('Password must contain a number'),
    ]
}
