import express from 'express';
import {api} from './router';
import {logger} from './logger';
import {errorHandler, logErrors, notFound} from './middlewares/error-handlers';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;

const app = express();

app.set('env', NODE_ENV);
app.set('port', PORT);

// Api routes
const API = '/api';
app.use(API, api);

app.use(notFound); // Catch 404
app.use(logErrors); // Log errors
app.use(errorHandler); // Catch all error handler

if (NODE_ENV !== 'test') {
    app.listen(PORT, (err) => {
        if (err) {
            logger.error(err);
            process.exit(1);
        } else {
            console.info("✓ Node running");
            logger.info(`✓ Serving api from "${API}"`);
        }
    });
}

export default app;
