import request from "supertest";
import app from "../src/app";

describe("POST /functions/paginate", () => {
  it("should return correct output for an empty items array", async () => {
    const input = {
      items: [],
      page: 1,
      limit: 3,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      output: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 3,
        paginatedItems: [],
      },
    });
  });

  it("should handle a single item correctly", async () => {
    const input = {
      items: [1],
      page: 1,
      limit: 1,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      output: {
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
        limit: 1,
        paginatedItems: [1],
      },
    });
  });

  it("should paginate an array correctly", async () => {
    const input = {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      page: 2,
      limit: 3,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      output: {
        totalItems: 9,
        totalPages: 3,
        currentPage: 2,
        limit: 3,
        paginatedItems: [4, 5, 6],
      },
    });
  });

  it("should paginate an array with strings (for example image urls) correctly", async () => {
    const input = {
      items: [
        "https://exampleImage.com",
        "https://exampleImage1.com",
        "https://exampleImage2.com",
        "https://exampleImage.com3",
        "https://exampleImage4.com",
        "https://exampleImage5.com",
      ],
      page: 2,
      limit: 3,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      output: {
        totalItems: 6,
        totalPages: 2,
        currentPage: 2,
        limit: 3,
        paginatedItems: [
          "https://exampleImage.com3",
          "https://exampleImage4.com",
          "https://exampleImage5.com",
        ],
      },
    });
  });

  it("should return an empty array for a page number exceeding total pages", async () => {
    const input = {
      items: [1, 2, 3],
      page: 5,
      limit: 2,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      output: {
        totalItems: 3,
        totalPages: 2,
        currentPage: 5,
        limit: 2,
        paginatedItems: [],
      },
    });
  });

  it("should return a 400 error if input is missing", async () => {
    const response = await request(app).post("/functions/paginate").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid input: Expected an object in req.body.input"
    );
  });

  it("should return a 400 error if input is invalid", async () => {
    const input = {
      items: "not an array",
      page: 1,
      limit: 3,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid input: 'items' must be an array."
    );
  });

  it("should return a 400 error for invalid page number", async () => {
    const input = {
      items: [1, 2, 3],
      page: -1,
      limit: 2,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid input: 'page' must be a positive number."
    );
  });

  it("should return a 400 error for invalid limit", async () => {
    const input = {
      items: [1, 2, 3],
      page: 1,
      limit: 0,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid input: 'limit' must be a positive number."
    );
  });

  it("should return a 500 error if items is missing", async () => {
    const input = {
      page: 1,
      limit: 1,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Missing required fields in the input");
  });

  it("should return a 500 error if page is missing", async () => {
    const input = {
      items: [1, 2, 3],
      limit: 1,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Missing required fields in the input");
  });

  it("should return a 500 error if limit is missing", async () => {
    const input = {
      items: [1, 2, 3],
      page: 1,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Missing required fields in the input");
  });

  it("should return a 400 error for mixed types in items array", async () => {
    const input = {
      items: [1, "string", { key: "value" }],
      page: 1,
      limit: 2,
    };

    const response = await request(app)
      .post("/functions/paginate")
      .send({ input });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid input: 'items' array contains mixed types."
    );
  });
});
