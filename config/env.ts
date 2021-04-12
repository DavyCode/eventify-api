import dotenv from "dotenv";

// Load .env
dotenv.config();

export const {
  PORT,
  JWT_SECRET,
  JWT_EXPIRATION_MINUTES,
  DBURL,
  JWT_BEARER
} = process.env;