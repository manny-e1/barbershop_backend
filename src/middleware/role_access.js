import createError from 'http-errors';
import { ROLE } from '../constant/role_enum.js';

export async function isShopAdmin(req, _, next) {
  if (req.user.role !== ROLE.SHOPADMIN)
    throw createError.Forbidden('Not authorized to perform this action');
  next();
}

export async function isClient(req, _, next) {
  if (req.user.role !== ROLE.CLIENT)
    throw createError.Forbidden('Not authorized to perform this action');
  next();
}

export async function isAdmin(req, _, next) {
  if (req.user.role !== ROLE.ADMIN)
    throw createError.Forbidden('Not authorized to perform this action');
  next();
}

export async function isAdminOrShopAdmin(req, _, next) {
  if (req.user.role !== ROLE.ADMIN && req.user.role !== ROLE.SHOPADMIN)
    throw createError.Forbidden('Not authorized to perform this action');
  next();
}
