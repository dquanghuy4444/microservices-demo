import express from 'express';
import validate from '../../middlewares/validate.middleware';
import UserValidator from './user.validator';
import UserController from './user.controller';
import asyncHandler from '../../core/async-handler';
import authentication from '../../middlewares/authentication.middleware';

const router = express.Router();

router.get(`/me`, authentication, asyncHandler(UserController.handleVerify));

router.get(`/verify-email`, asyncHandler(UserController.handleVerifyEmail));

router.post(`/verify-email`, validate(UserValidator.verifyEmail), asyncHandler(UserController.handleSendMailtoVerifyMail));

export default router;
