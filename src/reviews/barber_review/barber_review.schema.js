import mongoose from 'mongoose';

const barberReviewSchema = mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    unique: true,
  },
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: true,
    unique: true,
  },
  reviewText: String,
  rating: {
    type: Number,
    required: true,
  },
});

export const BarberReviewModel = mongoose.model(
  'BarberReview',
  barberReviewSchema
);
