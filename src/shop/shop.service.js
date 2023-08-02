import { ShopModel } from './shop.schema.js';

export async function createShop(shop) {
  return ShopModel.create({ ...shop });
}

export async function getShop(id) {
  return ShopModel.findById(id).populate('barbers').populate('shopAdmin');
}

export async function getShops(filter) {
  return ShopModel.find(filter).populate('barbers').populate('shopAdmin');
}

export async function modifyShop(id, shop) {
  return ShopModel.updateOne({ _id: id }, shop);
}

export async function deleteShop(id) {
  return ShopModel.findByIdAndDelete(id);
}
