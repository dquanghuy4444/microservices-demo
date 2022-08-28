import express from 'express';
import validate from '../middlewares/validate.middleware';
import AuthController from '../controllers/auth.controller';
import AuthValidator from '../validators/auth.validator';
import { PAGE_ROUTER_STUDENT, PAGE_ROUTER_TEACHER } from '../const/page-routers';

const router = express.Router();

router.post(`/login`, validate(AuthValidator.login), AuthController.login);

router.post(`${PAGE_ROUTER_STUDENT}/register`, validate(AuthValidator.register), AuthController.registerForStudent);

router.post(`${PAGE_ROUTER_TEACHER}/register`, validate(AuthValidator.register), AuthController.registerForTeacher);

export default router;
