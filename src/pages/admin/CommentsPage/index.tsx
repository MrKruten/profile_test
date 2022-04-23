import React from "react";
import { useStore } from "effector-react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { $comments } from "shared/lib";
import { AdminCommentsList } from "widgets";

const CommentsPage = () => {
  const comments = useStore($comments);

  return (
    <AdminTemplate
      header={<HeaderAdmin />}
      navigation={<AdminNav />}
      isZero={comments.length === 0}
      textZero="Список отзывов пуст"
      main={<AdminCommentsList />}
    />
  );
};

export default CommentsPage;
