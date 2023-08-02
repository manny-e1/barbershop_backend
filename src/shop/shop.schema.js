import mongoosee from 'mongoose';
import { StringType } from '../constant/string_type.js';

const shopSchema = mongoosee.Schema({
  name: StringType,
  shopAdmin: {
    type: mongoosee.Schema.Types.ObjectId,
    ref: 'ShopAdmin',
    required: true,
  },
  pics: [String],
  barbers: [
    {
      type: mongoosee.Schema.Types.ObjectId,
      ref: 'Barber',
      required: true,
    },
  ],
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  services: [
    {
      serviceName: StringType,
      servicePic: String,
      servicePrice: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const ShopModel = mongoosee.model('Shop', shopSchema);
