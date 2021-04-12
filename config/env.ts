import dotenv from "dotenv";

// Load .env
dotenv.config();

export const {
  PORT,
  JWT_SECRET,
  JWT_EXPIRATION_MINUTES,
} = process.env;