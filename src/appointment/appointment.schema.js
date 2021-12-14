import mongoose from 'mongoose';
import { DAYS } from '../constant/days_enum';
import { StringType } from '../constant/string_type';

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

    day: {
      ...StringType,
      enum: Object.values(DAYS),
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
