import {  check } from 'express-validator';

export default class UserValidator {
    static verifyEmail = [
        check('email')
            .exists()
            .withMessage('Email is required')
            .matches(/.+\@.+\..+/)
            .withMessage('Email must contain @')
            .isLength({ min: 4, max: 32 })
            .withMessage('Email must be between 3 to 32 characters')
    ];
}
