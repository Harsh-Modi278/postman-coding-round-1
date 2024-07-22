"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.getCommentById = exports.getAllComments = void 0;
const uuid_1 = require("uuid");
const inMemoryDB_1 = require("../data/inMemoryDB");
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allComments = inMemoryDB_1.commentsTable;
    const commentsMap = new Map();
    allComments.forEach((commentRow) => {
        const comment = {
            id: commentRow.id,
            content: commentRow.content,
            replies: [],
        };
        commentsMap.set(commentRow.id, comment);
    });
    const commentsResponse = [];
    allComments.forEach((commentRow) => {
        const comment = commentsMap.get(commentRow.id);
        if (commentRow.parent_id) {
            const parentComment = commentsMap.get(commentRow.parent_id);
            if (comment && parentComment) {
                parentComment.replies.push(comment);
            }
        }
        else {
            if (comment) {
                commentsResponse.push(comment);
            }
        }
    });
    res.json(commentsResponse);
});
exports.getAllComments = getAllComments;
const getAllNestedComments = (comment) => {
    console.log(comment);
    if (!comment)
        return;
    const childComments = inMemoryDB_1.commentsTable.filter((commentRow) => commentRow.parent_id == comment.id);
    childComments === null || childComments === void 0 ? void 0 : childComments.forEach((childComment) => {
        var _a;
        const child = {
            id: childComment.id,
            content: childComment.content,
            replies: [],
        };
        (_a = comment.replies) === null || _a === void 0 ? void 0 : _a.push(child);
        getAllNestedComments(child);
    });
};
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const commentByIdArray = inMemoryDB_1.commentsTable.filter((commentRow) => commentRow.id == commentId);
    let commentById;
    if (commentByIdArray.length > 0) {
        commentById = commentByIdArray[0];
    }
    if (commentById) {
        const comment = {
            id: commentById.id,
            content: commentById.content,
            replies: [],
        };
        getAllNestedComments(comment);
        res.json(comment);
    }
    res.status(404).send("error");
});
exports.getCommentById = getCommentById;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, parent_id } = req.body;
    const id = (0, uuid_1.v4)();
    inMemoryDB_1.commentsTable.push({ id, content, parent_id });
    res.json(inMemoryDB_1.commentsTable[inMemoryDB_1.commentsTable.length - 1]);
});
exports.createComment = createComment;
