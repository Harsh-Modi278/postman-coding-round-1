"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const commentsControllers_1 = require("../controllers/commentsControllers");
exports.router = express_1.default.Router();
exports.router.get("/", commentsControllers_1.getAllComments);
exports.router.get("/:commentId", commentsControllers_1.getCommentById);
exports.router.post("/", commentsControllers_1.createComment);
