import mongoose from 'mongoose';

export const checkID = (id, error, message) => {
  if (!mongoose.isValidObjectId(id)) throw error(message);
};
