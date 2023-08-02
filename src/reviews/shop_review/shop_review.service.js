import { ShopReviewModel } from './shop_review.schema.js';

export async function reviewShop(review) {
  return ShopReviewModel.create({ ...review });
}

export async function getShopReview(filter) {
  return ShopReviewModel.findOne(filter)
    .populate('reviewer')
    .populate({
      path: 'shop',
      populate: { path: 'shopAdmin' },
    })
    .populate({
      path: 'shop',
      populate: { path: 'barbers' },
    });
}

export async function getShopReviews(shopId) {
  return ShopReviewModel.find({
    shop: shopId,
  })
    .populate('reviewer')
    .populate({
      path: 'shop',
      populate: { path: 'shopAdmin' },
    })
    .populate({
      path: 'shop',
      populate: { path: 'barbers' },
    });
}

export async function getAllShopReviews() {
  return ShopReviewModel.find()
    .populate('reviewer')
    .populate({
      path: 'shop',
      populate: { path: 'shopAdmin' },
    })
    .populate({
      path: 'shop',
      populate: { path: 'barbers' },
    });
}

export async function updateShopReview(id, review) {
  return ShopReviewModel.updateOne({ _id: id }, review);
}

export async function deleteShopReview(id) {
  return ShopReviewModel.findByIdAndDelete(id);
}
