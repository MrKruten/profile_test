import { CommentsModel } from "entities/Comment";

export const $publishedComments = CommentsModel.$comments.map((comments) =>
  comments.filter((comment) => comment.status === "approved")
);
