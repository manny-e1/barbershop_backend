import mongoose from 'mongoose';
import { DAYS } from '../constant/days_enum.js';
import { STATUS } from '../constant/status_enum.js';
import { StringType } from '../constant/string_type.js';

const appointmentSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client',
    },
    barber: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Barber',
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Shop',
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      default: STATUS.PENDING,
      enum: Object.values(STATUS),
    },
  },
  {
    timestamps: true,
  }
);

export const AppointmentModel = mongoose.model(
  'appointment',
  appointmentSchema
);
