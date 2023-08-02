import createError from 'http-errors';
import { checkID } from '../../helpers/check_id.js';
import {
  getBarberReview,
  reviewBarber,
  getBarberReviews,
  updateBarberReview,
  deleteBarberReview,
  getAllBarberReviews,
} from './barber_review.service.js';

import { ROLE } from '../../constant/role_enum.js';
import { getUser } from '../../user/user.service.js';

export async function httpReviewBarber(req, res) {
  checkID(req.body.barber, createError.NotFound, "Barber doesn't exist");

  const barberExists = await getUser({ _id: req.body.barber });

  if (!barberExists) throw createError.NotFound('Barber does not exist');

  const alreadyReviewed = await getBarberReview({
    reviewer: req.user.aud,
    barber: req.body.barber,
  });

  if (alreadyReviewed)
    throw createError.Conflict("You've already given your review");

  let review = {};

  review = { ...req.body, reviewer: req.user.aud };

  res.status(201).json(await reviewBarber(review));
}

export async function httpGetBarberReviewByID(req, res) {
  checkID(req.params.id, createError.NotFound, 'Review not found');

  const barberReview = await getBarberReview({ _id: req.params.id });
  if (!barberReview) throw createError.NotFound('Review not found');

  res.status(200).json(barberReview);
}

export async function httpGetBarberReviews(req, res) {
  const { id: barberID } = req.params;

  checkID(barberID, createError.NotFound, 'Barber not found');

  res.status(200).json(await getBarberReviews(barberID));
}

export async function httpGetAllBarberReviews(req, res) {
  res.status(200).json(await getAllBarberReviews());
}

export async function httpUpdateBarberReview(req, res) {
  checkID(req.params.id, createError.NotFound, 'Review not found');

  const barberReview = await getBarberReview({ _id: req.params.id });
  if (!barberReview) throw createError.NotFound('Review not found');

  if (req.user.aud !== barberReview.client && req.user.role !== ROLE.ADMIN)
    throw createError.Forbidden("You can't update this review");

  res.status(200).json(await updateBarberReview(barberReview.id));
}

export async function httpDeleteBarberReview(req, res) {
  checkID(req.params.id, createError.NotFound, 'Review not found');

  const barberReview = await getBarberReview({ _id: req.params.id });
  if (!barberReview) throw createError.NotFound('Review not found');

  if (req.user.aud !== barberReview.client && req.user.role !== ROLE.ADMIN)
    throw createError.Forbidden("You can't delete this review");

  res.status(200).json(await deleteBarberReview(barberReview.id));
}
