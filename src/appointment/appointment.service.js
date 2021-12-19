import { differenceInHours } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import createError from 'http-errors';
import { ROLE } from '../constant/role_enum.js';
import { calculateDateDifference } from '../helpers/calculate_date_difference.js';
import { getShop } from '../shop/shop.service.js';
import { AppointmentModel } from './appointment.schema.js';

export async function bookAppointment(appointment) {
  const dateBetween = calculateDateDifference(appointment.startTime.toString);
  if (dateBetween > 7)
    throw createError.BadRequest('Please choose a date within 7 days range');

  const ableToBook = await getShop(appointment.shop);
  if (!ableToBook && ableToBook.barber !== appointment.barber)
    throw createError.BadRequest('Unable to book an appointment');

  if (
    differenceInHours(
      parseISO(appointment.endTime.toString) -
        parseISO(appointment.startTime.toString)
    ) > 2
  )
    throw createError.BadRequest(
      "You can't book an appointment for more than 2 hours"
    );
  const appointmentExists = await getAppointment({
    client: appointment.client,
    shop: appointment.shop,
    startTime: {
      $gt: new Date(
        new Date(appointment.startTime.toString()).setUTCHours(0, 0, 0, 0)
      ),
      $lt: addDays(
        new Date(
          new Date(appointment.startTime.toString()).setUTCHours(0, 0, 0, 0)
        ),
        1
      ),
    },
  });

  if (appointmentExists)
    throw createError.Conflict(
      "You can't book an appointment more than once in the same day"
    );

  const timeConflit = await getAppointment({
    shop: appointment.shop,
    $or: [
      {
        startTime: {
          $gte: new Date(parseISO(appointment.startTime.toString())),
          $lte: new Date(parseISO(appointment.endTime.toString())),
        },
        endTime: {
          $gte: new Date(parseISO(appointment.startTime.toString())),
          $lte: new Date(parseISO(appointment.endTime.toString())),
        },
      },
    ],
  });

  if (timeConflit)
    throw createError.Conflict(
      'Your selected time has a conflict with a previously booked appointment, please choose another time '
    );
  return AppointmentModel.create({ ...appointment });
}

export async function getAppointment(filter) {
  return AppointmentModel.findOne(filter);
}

export async function getAllAppointments(filter) {
  return AppointmentModel.find(filter);
}

export async function getShopAppointmets(shopID, filter) {
  return AppointmentModel.find({
    shop: shopID,
    ...filter,
  });
}

export async function getBarberAppointmets(barberID, filter) {
  return AppointmentModel.find({
    barber: barberID,
    ...filter,
  });
}

export async function updateAppointment(id, appointment, currentUser) {
  const appointmentExists = await getAppointment({ _id: id });
  if (!appointmentExists)
    throw createError.NotFound('Appointment does not exist');

  if (
    appointment.client !== currentUser.aud &&
    currentUser.aud !== ROLE.SHOPADMIN
  )
    throw createError.Forbidden("You can't perform this action");

  return AppointmentModel.updateOne(id, appointment);
}

export async function deleteAppointment(id) {
  const appointmentExists = await getAppointment({ _id: id });
  if (!appointmentExists)
    throw createError.NotFound('Appointment does not exist');

  return AppointmentModel.findByIdAndDelete(id);
}
