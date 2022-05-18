import { CommentsModel } from "entities/Comment";
import { Helpers } from "shared/lib";

export const $publishedComments = CommentsModel.$comments.map((comments) =>
  comments
    .sort((prev, next) => Helpers.compareDates(prev.createdAt, next.createdAt))
    .filter((comment) => comment.status === "approved")
);
