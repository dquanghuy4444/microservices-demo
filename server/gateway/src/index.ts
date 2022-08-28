import express from 'express';
import expressLoader from './loaders/express.loader';
import databaseLoader from './loaders/database.loader';
import { CONFIG_ENV_PORT } from './configs/env';

const startup = async () => {
    const app = express();

    await databaseLoader();
    console.log('✌️ DB loaded and connected!');

    await expressLoader(app);
    console.log('✌️ Express loaded');

    app.listen(CONFIG_ENV_PORT, () => {
        console.log('Hello ' + CONFIG_ENV_PORT);
    }).on('error', (e: any) => {
        console.log(e);
    });
}

startup();



