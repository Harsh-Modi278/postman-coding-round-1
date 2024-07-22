import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { commentsTable, IComemntsTable } from "../data/inMemoryDB";

interface IComment {
  id: string;
  content: string;
  replies: IComment[];
}

export const getAllComments = async (req: Request, res: Response) => {
  const allComments: IComemntsTable[] = commentsTable;
  const commentsMap: Map<string, IComment> = new Map();
  allComments.forEach((commentRow) => {
    const comment: IComment = {
      id: commentRow.id,
      content: commentRow.content,
      replies: [],
    };
    commentsMap.set(commentRow.id, comment);
  });

  const commentsResponse: IComment[] = [];

  allComments.forEach((commentRow) => {
    const comment = commentsMap.get(commentRow.id);
    if (commentRow.parent_id) {
      const parentComment = commentsMap.get(commentRow.parent_id);

      if (comment && parentComment) {
        parentComment.replies.push(comment);
      }
    } else {
      if (comment) {
        commentsResponse.push(comment);
      }
    }
  });

  res.json(commentsResponse);
};

const getAllNestedComments = (comment: IComment) => {
  console.log(comment);
  if (!comment) return;
  const childComments: IComemntsTable[] = commentsTable.filter(
    (commentRow) => commentRow.parent_id == comment.id
  );
  childComments?.forEach((childComment) => {
    const child: IComment = {
      id: childComment.id,
      content: childComment.content,
      replies: [],
    };
    comment.replies?.push(child);
    getAllNestedComments(child);
  });
};

export const getCommentById = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const commentByIdArray: IComemntsTable[] = commentsTable.filter(
    (commentRow) => commentRow.id == commentId
  );
  let commentById;
  if (commentByIdArray.length > 0) {
    commentById = commentByIdArray[0];
  }

  if (commentById) {
    const comment: IComment = {
      id: commentById.id,
      content: commentById.content,
      replies: [],
    };
    getAllNestedComments(comment);
    res.json(comment);
  } else {
    res.status(404).send("error");
  }
};

export const createComment = async (req: Request, res: Response) => {
  const { content, parent_id } = req.body;

  const id = uuidv4();
  commentsTable.push({ id, content, parent_id });
  res.json(commentsTable[commentsTable.length - 1]);
};
