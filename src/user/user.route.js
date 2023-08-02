import express from 'express';
import { errorCatcher } from '../middleware/error_handlers.js';
import {
  httpGetUserByID,
  httpLogin,
  httpRegisterUser,
} from './user.controller.js';
import { UserModel } from './user.schema.js';

const authRouter = express.Router();
const userRouter = express.Router();

authRouter.route('/register').post(errorCatcher(httpRegisterUser));
authRouter.route('/login').post(errorCatcher(httpLogin));
userRouter.route('/:id').get(errorCatcher(httpGetUserByID));
userRouter.route('/').get(
  errorCatcher(async (req, res) => {
    res.status(200).json(await UserModel.find());
  })
);

export { authRouter, userRouter };
