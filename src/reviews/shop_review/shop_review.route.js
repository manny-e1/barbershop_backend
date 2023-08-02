import express from 'express';
import {
  httpReviewShop,
  httpGetAllShopReviews,
  httpGetShopReviewByID,
  httpGetShopReviews,
  httpUpdateShopReview,
  httpDeleteShopReview,
} from './shop_review.controller.js';
import { errorCatcher } from '../../middleware/error_handlers.js';
import { verifyAccessToken } from '../../middleware/jwt_helpers.js';
import { isClient } from '../../middleware/role_access.js';

const router = express.Router();

router
  .route('/')
  .post(
    errorCatcher(verifyAccessToken),
    errorCatcher(isClient),
    errorCatcher(httpReviewShop)
  )
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpGetAllShopReviews));

router
  .route('/shop/:id')
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpGetShopReviews));

router
  .route('/:id')
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpGetShopReviewByID))
  .put(errorCatcher(verifyAccessToken), errorCatcher(httpUpdateShopReview))
  .delete(errorCatcher(httpDeleteShopReview));

export default router;
