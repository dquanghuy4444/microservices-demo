import { SuccessResponse } from '../core/api-response';
import express from 'express';
import authRoute from '../routes/auth.route'

const router = express.Router();

router.get('/health', (req, res) => {
    new SuccessResponse({
        msg: `Welcome to my own`
    }).send(res);
});

router.use('/auth', authRoute);


export default router;
