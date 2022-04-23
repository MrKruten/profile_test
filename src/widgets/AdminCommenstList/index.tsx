import React, { useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { useStore } from "effector-react";

import { Types } from "shared/lib";
import { HeaderContentAdmin } from "shared/ui";
import { Comment } from "entities/Comment";
import {
  $sortedComments,
  filterComments,
} from "widgets/AdminCommenstList/model";
import { ButtonsAdminComment } from "features/ButtonsAdminComment";
import "./style.scss";
import { EditCommentModel } from "features/EditComment";

const filterOptions = [
  { value: "editable", label: "Сначала неопубликованные" },
  { value: "rejected", label: "Сначала отклоненные" },
  { value: "published", label: "Сначала опубликованные" },
];

interface IITems {
  items: Array<Types.IComment>;
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
      {items.map((comment, id) => (
        <li key={`${comment.name}-${comment.id}`}>
          <Comment
            isAdmin
            status={comment.status}
            name={comment.name}
            date={comment.date}
            text={comment.text}
            avatar={comment.avatar}
            editBlock={
              comment.status === "editable" ? (
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

  const onChangeFilter = (
    filter: SingleValue<{ value: string; label: string }>
  ) => {
    if (!filter) return;
    filterComments(filter.value);
  };

  useEffect(() => {
    onChangeFilter(filterOptions[0]);
  }, []);

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
      <Items items={comments} />
    </div>
  );
};
