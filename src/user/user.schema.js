import mongoose from 'mongoose';
import { DAYS } from '../constant/days_enum.js';
import { GENDER } from '../constant/gender_enum.js';
import { ROLE } from '../constant/role_enum.js';
import { StringType } from '../constant/string_type.js';

const userSchema = mongoose.Schema(
  {
    name: StringType,
    email: {
      ...StringType,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      ...StringType,
      enum: Object.values(ROLE),
    },
    avatar: String,
    phoneNumber: StringType,
  },
  {
    discriminatorKey: 'user',
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', userSchema);

const BarberModel = UserModel.discriminator(
  'Barber',
  mongoose.Schema({
    availableDays: [
      {
        ...StringType,
        enum: Object.values(DAYS),
      },
    ],
    gender: {
      ...StringType,
      enum: Object.values(GENDER),
    },
  })
);

const ClientModel = UserModel.discriminator(
  'Client',
  mongoose.Schema({
    password: StringType,
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
  })
);

const ShopAdminModel = UserModel.discriminator(
  'ShopAdmin',
  mongoose.Schema({
    password: StringType,
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
    gender: {
      ...StringType,
      enum: Object.values(GENDER),
    },
  })
);
const AdminModel = UserModel.discriminator(
  'Admin',
  mongoose.Schema({
    password: StringType,
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
  })
);

export { UserModel, BarberModel, AdminModel, ShopAdminModel, ClientModel };
