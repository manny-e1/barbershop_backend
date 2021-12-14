import mongoose from 'mongoose';

const shopReviewSchema = mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    unique: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
    unique: true,
  },
  reviewText: String,
  rating: {
    type: Number,
    required: true,
  },
});

export const ShopReviewSchema = mongoose.model('ShopReview', shopReviewSchema);
