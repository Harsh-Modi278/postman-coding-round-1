import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({
  path: "/Users/harshmodi/Documents/postman-coding-round/.env",
  encoding: "utf-8",
});

const devConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5000"),
};

export const pool = new Pool(devConfig);
