import express from 'express';
import { errorCatcher } from '../middleware/error_handlers.js';
import { verifyAccessToken } from '../middleware/jwt_helpers.js';
import {
  isAdmin,
  isAdminOrShopAdmin,
  isShopAdmin,
} from '../middleware/role_access.js';
import {
  httpCreateShop,
  httpDeleteShop,
  httpGetShop,
  httpGetShops,
  httpModifyShop,
} from './shop.controller.js';

const router = express.Router();

router.route('/ss').get((req,res) => {res.send({hi:"hi"})})
router
  .route('/')
  .post(
    errorCatcher(verifyAccessToken),
    errorCatcher(isAdminOrShopAdmin),
    errorCatcher(httpCreateShop)
  )
  .get(
  errorCatcher(verifyAccessToken),
   errorCatcher(httpGetShops));
router
  .route('/:id')
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpGetShop))
  .put(
    errorCatcher(verifyAccessToken),
    errorCatcher(isShopAdmin),
    errorCatcher(httpModifyShop)
  )
  .delete(
    errorCatcher(verifyAccessToken),
    errorCatcher(isAdminOrShopAdmin),
    errorCatcher(httpDeleteShop)
  );

export default router;
