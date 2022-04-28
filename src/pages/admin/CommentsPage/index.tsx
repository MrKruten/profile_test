import React from "react";
import { useStore } from "effector-react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { $comments } from "shared/lib";
import { AdminCommentsList } from "widgets";
import { ModalWrapper } from "shared/ui";
import { EditComment } from "features/EditComment";
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
      />
      <ModalWrapper isShow={isShowEditComment} modal={<EditComment />} />
    </>
  );
};

export default CommentsPage;
