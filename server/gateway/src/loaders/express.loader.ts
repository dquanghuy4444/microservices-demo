import express, { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ApiError, NotFoundError, InternalError } from "../core/api-error"
import route from './express-route';
import morgan from 'morgan';
import { CONFIG_ENV_NODE_ENV } from '../configs/env';
import { i18n } from '../locales';

export default (app: Express) => {
    if (CONFIG_ENV_NODE_ENV !== 'production') {
        app.use(morgan('dev'));
    }

    app.use(express.json());
    app.use(helmet());
    app.use(helmet.hidePoweredBy());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(cookieParser());
    app.use(i18n.init);

    // Routes
    app.use('/gateway', route);

    // catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: NextFunction) =>
        next(new NotFoundError())
    );

    // Middleware Error Handler
    app.use(
        async (err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof ApiError) {
                ApiError.handle(err, res);
            } else {
                ApiError.handle(new InternalError(), res);
            }
        }
    );
};
