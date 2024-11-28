import express from "express";
import cors from "cors";
import paginateRoutes from "./routes/paginateRoutes.js";
import { handleErrors } from "./handlers/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/functions/paginate", paginateRoutes);

app.use(handleErrors);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
