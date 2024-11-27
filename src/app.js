import express from "express";
import cors from "cors";
import paginateRoutes from "./routes/paginateRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/functions/paginate", paginateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
