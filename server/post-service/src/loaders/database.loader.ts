import Mongoose from 'mongoose';
import { CONFIG_ENV_MONGODB_URI } from '../configs/env';

export default async () => {
    return new Promise((resolve, reject) => {
        Mongoose.Promise = global.Promise;

        Mongoose.connect(
            CONFIG_ENV_MONGODB_URI,
            {
                // useCreateIndex: true,
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
                // useFindAndModify: false
            },
            function (err) {
                if (err) throw err;
            }
        );

        process.on('SIGINT', function () {
            Mongoose.connection.close(function () {
                console.log(
                    'Mongo Database disconnected through app termination'
                );
                process.exit(0);
            });
        });

        Mongoose.connection.on('connected', function () {
            resolve('Mongo Database connected');
        });

        Mongoose.connection.on('disconnected', function () {
            reject('Mongo Database disconnected');
        });
    });
};
