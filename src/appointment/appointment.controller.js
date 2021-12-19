import createError from 'http-errors';
import { checkID } from '../helpers/check_id.js';
import { bookAppointment } from './appointment.service.js';

export async function httpBookAppointment(req, res) {
  const { barber, shop, startTime, endTime } = req.body;

  checkID(barber, createError.NotFound('Barber not found'));
  checkID(shop, createError.NotFound('Shop not found'));

  if (isNaN(startTime) || isNaN(endTime)) {
    throw createError.BadRequest('Invalid appointment date');
  }

  const appointment = { ...req.body, client: req.user.aud };

  res.json(201).json(await bookAppointment(appointment));
}
