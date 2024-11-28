import request from "supertest";
import app from "../src/app";

describe("GET /functions/paginate", () => {
  it("should return the correct documentation for the paginate function", async () => {
    const response = await request(app).get("/functions/paginate");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "paginate");
    expect(response.body).toHaveProperty(
      "description",
      "Paginate an array of items into pages of a specified limit size."
    );
    expect(response.body.input).toHaveProperty("type", "object");
    expect(response.body.output).toHaveProperty("type", "object");
  });

  it("should correctly define the input schema", async () => {
    const response = await request(app).get("/functions/paginate");
    const { input } = response.body;
    expect(input).toHaveProperty("type", "object");
    expect(input).toHaveProperty(
      "description",
      "An object containing the items to paginate, the page number and the limit of itmes."
    );
    expect(input).toHaveProperty("example", {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      page: 2,
      limit: 3,
    });
  });

  it("should correctly define the output schema", async () => {
    const response = await request(app).get("/functions/paginate");
    const { output } = response.body;
    expect(output).toHaveProperty("type", "object");
    expect(output).toHaveProperty(
      "description",
      "An object containing pagination details and the items for the specified page."
    );
    expect(output).toHaveProperty("example", {
      totalItems: 9,
      totalPages: 3,
      currentPage: 2,
      limit: 3,
      paginatedItems: [4, 5, 6],
    });
  });
});
