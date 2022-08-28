import { SuccessResponse } from '../core/api-response';
import express from 'express';
import authRoute from '../modules/auth/auth.route'
import userRoute from '../modules/user/user.route'

const router = express.Router();

router.get('/health', (req, res) => {
    new SuccessResponse({
        msg: `Welcome to my own`
    }).send(res);
});

router.use('/auth', authRoute);
router.use('/users', userRoute);


export default router;
