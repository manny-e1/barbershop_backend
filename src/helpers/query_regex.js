export const queryRegex = (query) => {
  let queryStr;
  if (Object.keys(query).length > 0) {
    queryStr = JSON.stringify({ ...query }).replace(
      /\b(gt|lt|lte|gte|in)\b/g,
      (match) => `$${match}`
    );
  }
  return queryStr;
};
