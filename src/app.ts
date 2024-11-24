import express from "express";
import cors from "cors";
import memberRoutes from "./routes/memberRoutes";
import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";

const app = express();

app.use(
  cors({
    origin: "*", // Replace with your frontend's origin
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Ensure OPTIONS is included
    allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
    credentials: true, // If cookies or authentication are needed
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/members", memberRoutes);
app.use("/books", bookRoutes);
app.use("/", borrowRoutes);

export default app;
