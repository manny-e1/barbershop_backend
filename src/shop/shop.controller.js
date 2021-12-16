import createError from 'http-errors';
import { ROLE } from '../constant/role_enum.js';
import { checkID } from '../helpers/check_id.js';
import { createShop, getShop, getShops } from './shop.service.js';

export async function httpCreateShop(req, res) {
  const shop = { ...req.body };

  if (req.user.role == ROLE.ADMIN) {
    if (!shop.shopAdmin || !mongoose.isValidObjectId(shop.shopAdmin))
      throw createError.UnprocessableEntity('please enter a real shop admin');
  } else if (req.user.role === ROLE.SHOPADMIN) {
    shop['shopAdmin'] = req.user.aud;
  }

  shop.barbers?.forEach((barber) => {
    checkID(
      barber,
      createError.UnprocessableEntity,
      'please enter real barbers'
    );
  });

  res.status(201).json(await createShop(shop));
}

export async function httpGetShop(req, res) {
  checkID(req.params.id, createError.NotFound, "Shop doesn't exist");

  const shop = await getShop(req.params.id);
  if (!shop) throw createError.NotFound("Shop doesn't exist");
  res.status(200).json(shop);
}

export async function httpGetShops(req, res) {
  let query;
  if (req.user.role === ROLE.SHOPADMIN) query = { shopAdmin: req.user.aud };
  res.status(200).json(await getShops(query ?? {}));
}

export async function httpModifyShop(req, res) {
  checkID(req.params.id, createError.NotFound, "Shop doesn't exist");

  const shop = await getShop(req.params.id);
  if (!shop) throw createError.NotFound("Shop doesn't exist");

  if (shop.shopAdmin !== req.user.aud) throw createError.Forbidden();
  res.status(200).json(req.params.id, req.body);
}

export async function httpDeleteShop(req, res) {
  checkID(req.params.id, createError.NotFound, "Shop doesn't exist");
  const shop = await getShop(req.params.id);
  if (!shop) throw createError.NotFound("Shop doesn't exist");
  res.status(200).json(req.params.id);
}
