import createError from 'http-errors';

function notFound(req, _, next) {
  next(createError(404, `Not Found - ${req.method} ${req.originalUrl}`));
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

function errorHandler(err, _, res, next) {
  const statusCode = err.statusCode || 500;
  console.log(err);
  res.status(statusCode).json({
    message: IsJsonString(err.message) ? JSON.parse(err.message) : err.message,
  });
}

export { notFound, errorCatcher, errorHandler };
