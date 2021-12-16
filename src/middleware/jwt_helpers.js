import createError from 'http-errors';
import jwt from 'jsonwebtoken';

const jwtOption = (userId) => {
  return {
    expiresIn: '1y',
    issuer: 'manny',
    audience: userId,
  };
};

export const signAccessToken = (userId, role) => {
  return new Promise((resolve, reject) => {
    const payload = { role };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = jwtOption(userId);
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      resolve(token);
    });
  });
};
export const verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) throw createError.Unauthorized();
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
      throw createError.Unauthorized(message);
    }
    req.user = payload;
    next();
  });
};
