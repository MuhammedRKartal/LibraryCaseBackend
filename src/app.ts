import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import memberRoutes from "./routes/memberRoutes";
import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";
import { errorHandler } from "./errorHandler";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/users", memberRoutes);
app.use("/books", bookRoutes);
app.use("/", borrowRoutes);

app.use(errorHandler);

export default app;
