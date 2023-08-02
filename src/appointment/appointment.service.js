import { addDays, parseISO } from 'date-fns';
import createError from 'http-errors';
import { ROLE } from '../constant/role_enum.js';
import { getShop } from '../shop/shop.service.js';
import { AppointmentModel } from './appointment.schema.js';

export async function bookAppointment(appointment) {
  const ableToBook = await getShop(appointment.shop);
  if (!ableToBook && ableToBook.barber !== appointment.barber)
    throw createError.BadRequest('Unable to book an appointment');

  const stTime = new Date(appointment.startTime);

  const appointmentExists = await getAppointment({
    client: appointment.client,
    shop: appointment.shop,
    startTime: {
      $gte: new Date(stTime.setUTCHours(0, 0, 0, 0)),
      $lte: addDays(new Date(stTime.setUTCHours(0, 0, 0, 0)), 1),
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
          $gt: appointment.startTime,
          $lt: appointment.endTime,
        },
        endTime: {
          $gt: appointment.startTime,
          $lt: appointment.endTime,
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
  return AppointmentModel.findOne(filter)
    .populate('shop')
    .populate('client')
    .populate('barber');
}

export async function getAllAppointments(filter) {
  return AppointmentModel.find(filter)
    .populate('client')
    .populate({
      path: 'shop',
      populate: { path: 'shopAdmin' },
    })
    .populate({
      path: 'shop',
      populate: { path: 'barbers' },
    })
    .populate('barber');
}

export async function getShopAppointments(shopID, filter) {
  return AppointmentModel.find({
    shop: shopID,
    ...filter,
  })
    .populate('client')
    .populate({
      path: 'shop',
      populate: { path: 'shopAdmin' },
    })
    .populate({
      path: 'shop',
      populate: { path: 'barbers' },
    })
    .populate('barber');
}

export async function getBarberAppointments(barberID, filter) {
  return AppointmentModel.find({
    barber: barberID,
    ...filter,
  })
    .populate('client')
    .populate({
      path: 'shop',
      populate: { path: 'shopAdmin' },
    })
    .populate({
      path: 'shop',
      populate: { path: 'barbers' },
    })
    .populate('barber');
}

export async function updateAppointment(id, appointment, currentUser) {
  const appointmentExists = await getAppointment({ _id: id });
  if (!appointmentExists)
    throw createError.NotFound('Appointment does not exist');

  if (
    appointmentExists.client.toString() !== currentUser.aud &&
    currentUser.aud !== ROLE.SHOPADMIN
  )
    throw createError.Forbidden("You can't perform this action");

  return AppointmentModel.updateOne({ _id: id }, appointment);
}

export async function deleteAppointment(id) {
  const appointmentExists = await getAppointment({ _id: id });
  if (!appointmentExists)
    throw createError.NotFound('Appointment does not exist');

  return AppointmentModel.findByIdAndDelete(id);
}
