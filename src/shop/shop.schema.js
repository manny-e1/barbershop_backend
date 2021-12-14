import mongoosee from 'mongoose';
import { StringType } from '../constant/string_type.js';

const shopSchema = mongoosee.Schema({
  name: StringType,
  pics: [String],
  services: [
    {
      serviceName: StringType,
      servicePic: String,
      servicePrice: StringType,
    },
  ],
});

export const ShopModel = mongoosee.model('Shop', shopSchema);
