import express from 'express';
import {
  httpReviewBarber,
  httpGetAllBarberReviews,
  httpGetBarberReviewByID,
  httpGetBarberReviews,
  httpUpdateBarberReview,
  httpDeleteBarberReview,
} from './barber_review.controller.js';
import { errorCatcher } from '../../middleware/error_handlers.js';
import { verifyAccessToken } from '../../middleware/jwt_helpers.js';
import { isClient } from '../../middleware/role_access.js';

const router = express.Router();

router
  .route('/')
  .post(
    errorCatcher(verifyAccessToken),
    errorCatcher(isClient),
    errorCatcher(httpReviewBarber)
  )
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpGetAllBarberReviews));

router
  .route('/barber/:id')
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpGetBarberReviews));

router
  .route('/:id')
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpGetBarberReviewByID))
  .put(errorCatcher(verifyAccessToken), errorCatcher(httpUpdateBarberReview))
  .delete(errorCatcher(httpDeleteBarberReview));

export default router;
