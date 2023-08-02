import { BarberReviewModel } from './barber_review.schema.js';

export async function reviewBarber(review) {
  return BarberReviewModel.create({ ...review });
}

export async function getBarberReview(filter) {
  return BarberReviewModel.findOne(filter)
    .populate('barber')
    .populate('reviewer');
}

export async function getBarberReviews(barberId) {
  return BarberReviewModel.find({
    barber: barberId,
  })
    .populate('barber')
    .populate('reviewer');
}

export async function getAllBarberReviews() {
  return BarberReviewModel.find().populate('barber').populate('reviewer');
}

export async function updateBarberReview(id, review) {
  return BarberReviewModel.updateOne({ _id: id }, review);
}

export async function deleteBarberReview(id) {
  return BarberReviewModel.findByIdAndDelete(id);
}
