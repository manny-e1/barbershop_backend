import { ShopReviewModel } from './shop_review.schema.js';

export async function reviewShop(review) {
  return ShopReviewModel.create({ ...review });
}

export async function getShopReview(filter) {
  return ShopReviewModel.findOne(filter);
}

export async function getShopReviews(shopId) {
  return ShopReviewModel.find({
    shop: shopId,
  });
}

export async function getAllShopReviews() {
  return ShopReviewModel.find();
}

export async function updateShopReview(id, review) {
  return ShopReviewModel.updateOne({ _id: id }, review);
}

export async function deleteShopReview(id) {
  return ShopReviewModel.findByIdAndDelete(id);
}
