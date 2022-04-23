import React from "react";
import { useStore } from "effector-react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { $comments } from "shared/lib";
import { AdminCommentsList } from "widgets";
import { ModalWrapper } from "shared/ui";
import { EditComment } from "features/EditComment";
import { Notification } from "entities/Notification";
import { $isShowEditComment } from "features/EditComment/model";

const CommentsPage = () => {
  const comments = useStore($comments);
  const isShowEditComment = useStore($isShowEditComment);

  return (
    <>
      <AdminTemplate
        header={<HeaderAdmin />}
        navigation={<AdminNav />}
        isZero={comments.length === 0}
        textZero="Список отзывов пуст"
        main={<AdminCommentsList />}
        notifications={
          <Notification
            textSuccess="Отзыв успешно отредактирован!"
            textError="Не получилось отредактировать отзыв. Попробуйте еще раз!"
            titleSuccess="Отзыв изменен"
          />
        }
      />
      <ModalWrapper isShow={isShowEditComment} modal={<EditComment />} />
    </>
  );
};

export default CommentsPage;
