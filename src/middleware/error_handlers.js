import createError from 'http-errors';

function notFound(req, _, next) {
  const error = createError.notFound(
    `Not Found - ${req.method} ${req.originalUrl}`
  );
  next(error);
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function errorCatcher(fn) {
  return (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function errorHandler(err, _, res) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: IsJsonString(err.message) ? JSON.parse(err.message) : err.message,
  });
}

export { notFound, errorCatcher, errorHandler };
