export const paginateDocs = {
  name: "paginate",
  description:
    "Paginate an array of items into pages of a specified limit size.",
  input: {
    type: "object",
    description:
      "An object containing the items to paginate, the page number and the limit of itmes.",
    example: {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      page: 2,
      limit: 3,
    },
  },
  output: {
    type: "object",
    description:
      "An object containing pagination details and the items for the specified page.",
    example: {
      totalItems: 9,
      totalPages: 3,
      currentPage: 2,
      limit: 3,
      paginatedItems: [4, 5, 6],
    },
  },
};
