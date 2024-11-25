import dotenv from "dotenv";
import app from "./app";

// Load environment variables from .env file
dotenv.config();

// Use the PORT from the environment variable, or default to 5000 if not set
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
