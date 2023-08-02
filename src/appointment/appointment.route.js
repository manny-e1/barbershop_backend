import express from 'express';
import { errorCatcher } from '../middleware/error_handlers.js';
import { verifyAccessToken } from '../middleware/jwt_helpers.js';
import {
  isAdmin,
  isAdminOrShopAdmin,
  isClient,
  isShopAdmin,
} from '../middleware/role_access.js';
import {
  httpAppointmentByID,
  httpBookAppointment,
  httpDeleteAppointment,
  httpGetAppointments,
  httpGetBarberAppointments,
  httpGetShopAppointments,
  httpUpdateAppointment,
} from './appointment.controller.js';

const router = express.Router();

router
  .route('/')
  .post(
    errorCatcher(verifyAccessToken),
    errorCatcher(isClient),
    errorCatcher(httpBookAppointment)
  )
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpGetAppointments));
router
  .route('/shop/:id')
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpGetShopAppointments));
router
  .route('/barber/:id')
  .get(
    errorCatcher(verifyAccessToken),
    errorCatcher(httpGetBarberAppointments)
  );

router
  .route('/:id')
  .get(errorCatcher(verifyAccessToken), errorCatcher(httpAppointmentByID))
  .put(errorCatcher(verifyAccessToken), errorCatcher(httpUpdateAppointment))
  .delete(
    errorCatcher(verifyAccessToken),
    errorCatcher(isAdmin),
    errorCatcher(httpDeleteAppointment)
  );
export default router;
