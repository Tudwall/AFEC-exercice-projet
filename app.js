import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/users", userRoutes);

app.listen(PORT, (req, res) => {
  console.info(`server running ${PORT}`);
});
