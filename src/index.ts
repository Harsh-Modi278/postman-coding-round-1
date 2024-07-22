import dotenv from "dotenv";
import express from "express";
import { router as commentsRoutes } from "./routes/commentsRoutes";
dotenv.config({
  path: "/Users/harshmodi/Documents/node-postgresql-rest-api/.env",
  encoding: "utf-8",
});

const PORT = process.env.PORT || 5000;
const app = express();

app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);

app.use(express.json());

app.use("/api/comments", commentsRoutes);

// app.get("/", async (req: Request, res: Response) => {
//   const result = await pool.query("SELECT * FROM test_table;");
//   res.send(result.rows);
// });
