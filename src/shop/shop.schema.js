import mongoosee from 'mongoose';
import { StringType } from '../constant/string_type.js';

const shopSchema = mongoosee.Schema({
  name: StringType,
  shopAdmin: {
    type: mongoosee.Schema.Types.ObjectId,
    ref: 'ShopAdmin',
    unique: true,
    required: true,
  },
  pics: [String],
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
