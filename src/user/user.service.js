import createError from 'http-errors';
import { ROLE } from '../constant/role_enum.js';
import {
  AdminModel,
  BarberModel,
  ClientModel,
  ShopAdminModel,
  UserModel,
} from './user.schema.js';

export async function registerUser(user) {
  switch (user.role) {
    case ROLE.ADMIN:
      return AdminModel.create({ ...user });
    case ROLE.BARBER:
      return BarberModel.create({ ...user });
    case ROLE.CLIENT:
      return ClientModel.create({ ...user });
    case ROLE.SHOPADMIN:
      return ShopAdminModel.create({ ...user });
    default:
      throw createError.UnprocessableEntity();
  }
}

export async function getUser(filter) {
  return UserModel.findOne(filter);
}
