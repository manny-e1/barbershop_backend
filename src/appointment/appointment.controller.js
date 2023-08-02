import { differenceInHours, differenceInMinutes, parseISO } from 'date-fns';
import createError from 'http-errors';
import { calculateDateDifference } from '../helpers/calculate_date_difference.js';
import { checkID } from '../helpers/check_id.js';
import { queryRegex } from '../helpers/query_regex.js';
import {
  bookAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointment,
  getBarberAppointments,
  getShopAppointments,
  updateAppointment,
} from './appointment.service.js';

export async function httpBookAppointment(req, res) {
  const { barber, shop, startTime, endTime } = req.body;

  checkID(barber, createError.NotFound('Barber does not exist'));
  checkID(shop, createError.NotFound('Shop does not exist'));

  if (
    isNaN(parseISO(startTime.toString())) ||
    isNaN(parseISO(endTime.toString()))
  ) {
    throw createError.BadRequest('Invalid appointment date');
  }

  const dateBetween = calculateDateDifference(startTime.toString());
  if (dateBetween > 7)
    throw createError.BadRequest('Please choose a date within 7 days range');

  if (
    differenceInMinutes(
      parseISO(endTime.toString()),
      parseISO(startTime.toString())
    ) > 120
  )
    throw createError.BadRequest(
      "You can't book an appointment for more than 2 hours"
    );

  const appointment = {
    barber,
    shop,
    startTime: new Date(parseISO(startTime.toString())),
    endTime: new Date(parseISO(endTime.toString())),
    client: req.user.aud,
    date: new Date(parseISO(startTime)).toDateString(),
  };

  res.status(201).json(await bookAppointment(appointment));
}

export async function httpGetAppointments(req, res) {
  res
    .status(200)
    .json(
      await getAllAppointments(
        queryRegex(req.query) ? JSON.parse(queryRegex(req.query)) : {}
      )
    );
}

export async function httpAppointmentByID(req, res) {
  checkID(req.params.id, createError.NotFound('Appointment does not exist'));
  const appointment = await getAppointment({ _id: req.params.id });
  if (!appointment) createError.NotFound('Appointment does not exist');

  res.status(200).json(appointment);
}

export async function httpGetShopAppointments(req, res) {
  const shopID = req.params.id;
  checkID(shopID, createError.NotFound('Shop does not exist'));

  res
    .status(200)
    .json(
      await getShopAppointments(
        shopID,
        queryRegex(req.query) ? JSON.parse(queryRegex(req.query)) : {}
      )
    );
}

export async function httpGetBarberAppointments(req, res) {
  const barberID = req.params.id;
  checkID(barberID, createError.NotFound('Shop does not exist'));

  res
    .status(200)
    .json(
      await getBarberAppointments(
        barberID,
        queryRegex(req.query) ? JSON.parse(queryRegex(req.query)) : {}
      )
    );
}

export async function httpUpdateAppointment(req, res) {
  const id = req.params.id;
  checkID(id, createError.NotFound('Appointment does not exist'));

  res.status(200).json(await updateAppointment(id, req.body, req.user));
}

export async function httpDeleteAppointment(req, res) {
  const id = req.params.id;
  checkID(id, createError.NotFound('Appointment does not exist'));

  res.status(200).json(await deleteAppointment(id));
}
