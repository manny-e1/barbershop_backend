import mongoosee from 'mongoose';
import { StringType } from '../constant/string_type.js';

const shopSchema = mongoosee.Schema({
  name: StringType,
});

export const ShopModel = mongoosee.model('Shop', shopSchema);
