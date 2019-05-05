// Error handlers

import {logger} from '../logger';
import {NotFoundException} from './exceptions';

//  Catch 404 and forward to error handler
const notFound = (req, res, next) => {
  next(NotFoundException(req.path));
};

// Log errors
const logErrors = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' || req.app.get('env') === 'test' ? err : {};
  logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  next(err);
};

// Catch all error handler
// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).send({
    message: err.message || 'Internal server error',
    reqOriginalUrl: req.originalUrl,
    reqMethod: req.method,
    reqIp: req.ip,
    time: (new Date()).toISOString()
  });
};

export {
  notFound,
  logErrors,
  errorHandler
};
