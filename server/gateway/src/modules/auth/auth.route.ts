import express from 'express';
import validate from '../../middlewares/validate.middleware';
import AuthController from './auth.controller';
import AuthValidator from './auth.validator';
import { PAGE_ROUTER_STUDENT, PAGE_ROUTER_TEACHER } from '../../const/page-routers';
import authentication from '../../middlewares/authentication.middleware';

const router = express.Router();

router.get(`/token`, authentication, AuthController.handleVerifyToken);

router.post(`/login`, validate(AuthValidator.login), AuthController.handleLogin);

router.post(`/forget-password`, validate(AuthValidator.forgetPassword), AuthController.handleForgetPassword);

router.post(`/reset-password`, validate(AuthValidator.resetPassword), AuthController.handleResetPassword);

router.post(`${PAGE_ROUTER_STUDENT}/register`, validate(AuthValidator.register), AuthController.handleRegisterForStudent);

router.post(`${PAGE_ROUTER_TEACHER}/register`, validate(AuthValidator.register), AuthController.handleRegisterForTeacher);

export default router;
