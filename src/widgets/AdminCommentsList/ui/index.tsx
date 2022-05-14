import React, { useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { useStore } from "effector-react";
import SkeletonLoading from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { CommentsModel, Comment } from "entities/Comment";
import { HeaderContentAdmin, ZeroData } from "shared/ui";
import { ButtonsAdminComment } from "features/ButtonsAdminComment";
import { EditCommentModel } from "features/EditCommentForm";
import { NotificationModel } from "entities/Notification";
import { Types } from "shared/constants";

import { $sortedComments, filterComments } from "../model";
import { filterOptions } from "../lib/options";

import "./style.scss";

interface IITems {
  items: Array<Types.IReview>;
}

const Items: React.FC<IITems> = ({ items }) => {
  const editFunc = () => {
    EditCommentModel.showEditComment(true);
  };

  if (!items) {
    return null;
  }
  return (
    <ul className="admin-comments__list">
      {items.map((comment) => (
        <li key={`${comment.authorName}-${comment.id}`}>
          <Comment
            isAdmin
            status={comment.status}
            authorName={comment.authorName}
            createdAt={comment.createdAt}
            text={comment.text}
            authorImage={comment.authorImage ? comment.authorImage! : "None"}
            editBlock={
              comment.status === "onCheck" ? (
                <ButtonsAdminComment comment={comment} editFunc={editFunc} />
              ) : null
            }
          />
        </li>
      ))}
    </ul>
  );
};

export const AdminCommentsList: React.FC = () => {
  const comments = useStore($sortedComments);
  const isLoading = useStore(CommentsModel.getCommentsFx.pending);

  const onChangeFilter = (
    filter: SingleValue<{ value: string; label: string }>
  ) => {
    if (!filter) return;
    filterComments(filter.value);
  };

  useEffect(() => {
    NotificationModel.setNotification({
      textError: "Не получилось отредактировать отзыв. Попробуйте еще раз!",
      textSuccess: "Отзыв успешно отредактирован!",
      titleSuccess: "Отзыв изменен",
    });
    onChangeFilter(filterOptions[0]);
    CommentsModel.getComments();
  }, []);

  if (comments.length === 0) {
    return <ZeroData text="Список отзывов пуст" />;
  }

  return (
    <div className="admin-comments">
      <HeaderContentAdmin
        title="Отзывы"
        select={
          <Select
            onChange={onChangeFilter}
            defaultValue={filterOptions[0]}
            className="react-select-container"
            classNamePrefix="react-select"
            options={filterOptions}
          />
        }
      />
      {isLoading ? (
        <ul className="admin-comments__list">
          {[...new Array(4)].map((_, index) => (
            <li
              className="admin-comments__skeleton"
              key={`skeleton-admin-${index + 1}`}
            >
              <SkeletonLoading
                count={1}
                width="519px"
                height="350px"
                baseColor="#E0E0E0"
              />
            </li>
          ))}
        </ul>
      ) : (
        <Items items={comments} />
      )}
    </div>
  );
};
