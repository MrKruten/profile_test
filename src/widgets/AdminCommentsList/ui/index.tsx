import React, { useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { useStore } from "effector-react";

import { getCommentsFx, Types } from "shared/lib";
import { HeaderContentAdmin, ZeroData } from "shared/ui";
import { Comment } from "entities/Comment";
import { ButtonsAdminComment } from "features/ButtonsAdminComment";
import { EditCommentModel } from "features/EditComment";
import { NotificationModel } from "entities/Notification";
import { Loader } from "shared/ui/Loader";

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
  const isLoading = useStore(getCommentsFx.pending);

  useEffect(() => {
    NotificationModel.setNotification({
      textError: "Не получилось отредактировать отзыв. Попробуйте еще раз!",
      textSuccess: "Отзыв успешно отредактирован!",
      titleSuccess: "Отзыв изменен",
    });
  }, []);

  const onChangeFilter = (
    filter: SingleValue<{ value: string; label: string }>
  ) => {
    if (!filter) return;
    filterComments(filter.value);
  };

  useEffect(() => {
    onChangeFilter(filterOptions[0]);
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
      {isLoading ? <Loader /> : <Items items={comments} />}
    </div>
  );
};
