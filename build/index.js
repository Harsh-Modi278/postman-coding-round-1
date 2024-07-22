"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const commentsRoutes_1 = require("./routes/commentsRoutes");
dotenv_1.default.config({
    path: "/Users/harshmodi/Documents/node-postgresql-rest-api/.env",
    encoding: "utf-8",
});
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
app.use(express_1.default.json());
app.use("/api/comments", commentsRoutes_1.router);
// app.get("/", async (req: Request, res: Response) => {
//   const result = await pool.query("SELECT * FROM test_table;");
//   res.send(result.rows);
// });
