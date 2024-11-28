export const paginate = ({ items, page, limit }) => {
  if (!Array.isArray(items)) {
    const error = new Error("Invalid input: 'items' must be an array.");
    error.status = 400;
    error.msg = error.message;
    throw error;
  }

  const itemTypes = new Set(items.map((item) => typeof item));
  if (itemTypes.size > 1) {
    const error = new Error(
      "Invalid input: 'items' array contains mixed types."
    );
    error.status = 400;
    error.msg = error.message;
    throw error;
  }

  if (typeof page !== "number" || page < 1) {
    const error = new Error("Invalid input: 'page' must be a positive number.");
    error.status = 400;
    error.msg = error.message;
    throw error;
  }
  if (typeof limit !== "number" || limit < 1) {
    const error = new Error(
      "Invalid input: 'limit' must be a positive number."
    );
    error.status = 400;
    error.msg = error.message;
    throw error;
  }

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    totalItems,
    totalPages,
    currentPage: page,
    limit,
    paginatedItems,
  };
};
