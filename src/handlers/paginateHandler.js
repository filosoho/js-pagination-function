// src/handlers/paginateHandler.js
import { paginate } from "../functions/paginate.js";

export const paginateHandler = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "object") {
      return res.status(400).json({
        error: "Invalid input: Expected an object in req.body.input",
      });
    }

    const { items, page, limit } = input;

    if (items === undefined || page === undefined || limit === undefined) {
      return res.status(500).json({
        error: "Missing required fields in the input",
      });
    }

    const output = paginate(input);

    res.send({ output });
  } catch (error) {
    if (error.message === "Invalid input: 'items' must be an array.") {
      return res.status(400).json({
        error: "Invalid input: 'items' must be an array.",
      });
    }
    if (
      error.message === "Invalid input: 'items' array contains mixed types."
    ) {
      return res.status(400).json({
        error: "Invalid input: 'items' array contains mixed types.",
      });
    }
    if (error.message === "Invalid input: 'page' must be a positive number.") {
      return res.status(400).json({
        error: "Invalid input: 'page' must be a positive number.",
      });
    }
    if (error.message === "Invalid input: 'limit' must be a positive number.") {
      return res.status(400).json({
        error: "Invalid input: 'limit' must be a positive number.",
      });
    }

    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
