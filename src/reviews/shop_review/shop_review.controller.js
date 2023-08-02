import createError from 'http-errors';
import { checkID } from '../../helpers/check_id.js';
import {
  getShopReview,
  reviewShop,
  getShopReviews,
  updateShopReview,
  deleteShopReview,
  getAllShopReviews,
} from './shop_review.service.js';

import { ROLE } from '../../constant/role_enum.js';
import { getShop } from '../../shop/shop.service.js';

export async function httpReviewShop(req, res) {
  checkID(req.body.shop, createError.NotFound, "Shop doesn't exist");

  const shopExists = await getShop({ _id: req.body.shop });

  if (!shopExists) throw createError.NotFound("Shop doesn't exist");

  const alreadyReviewed = await getShopReview({
    reviewer: req.user.aud,
    shop: req.body.shop,
  });

  if (alreadyReviewed)
    throw createError.Conflict("You've already given your review");

  let review = {};

  review = { ...req.body, reviewer: req.user.aud };

  res.status(201).json(await reviewShop(review));
}

export async function httpGetShopReviewByID(req, res) {
  checkID(req.params.id, createError.NotFound, 'Review not found');

  const shopReview = await getShopReview({ _id: req.params.id });
  if (!shopReview) throw createError.NotFound('Review not found');

  res.status(200).json(shopReview);
}

export async function httpGetShopReviews(req, res) {
  const { id: shopID } = req.params;

  checkID(shopID, createError.NotFound, 'Shop not found');

  res.status(200).json(await getShopReviews(shopID));
}

export async function httpGetAllShopReviews(req, res) {
  res.status(200).json(await getAllShopReviews());
}

export async function httpUpdateShopReview(req, res) {
  checkID(req.params.id, createError.NotFound, 'Review not found');

  const shopReview = await getShopReview({ _id: req.params.id });
  if (!shopReview) throw createError.NotFound('Review not found');

  if (req.user.aud !== shopReview.client && req.user.role !== ROLE.ADMIN)
    throw createError.Forbidden("You can't update this review");

  res.status(200).json(await updateShopReview(shopReview.id));
}

export async function httpDeleteShopReview(req, res) {
  checkID(req.params.id, createError.NotFound, 'Review not found');

  const shopReview = await getShopReview({ _id: req.params.id });
  if (!shopReview) throw createError.NotFound('Review not found');

  if (req.user.aud !== shopReview.client && req.user.role !== ROLE.ADMIN)
    throw createError.Forbidden("You can't delete this review");

  res.status(200).json(await deleteShopReview(shopReview.id));
}
