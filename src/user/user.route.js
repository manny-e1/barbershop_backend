import express from 'express';
import { errorCatcher } from '../middleware/error_handlers.js';
import { httpLogin, httpRegisterUser } from './user.controller.js';

const router = express.Router();

router.route('/register').post(errorCatcher(httpRegisterUser));
router.route('/login').post(errorCatcher(httpLogin));

export default router;
