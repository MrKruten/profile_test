import React from "react";
import { useStore } from "effector-react";

import { AddCommentForm, AddCommentModel } from "features/AddCommentForm";
import { ModalWrapper } from "shared/ui";

export const AddComment = () => {
  const isShowAddComment = useStore(AddCommentModel.$isShowAddComment);

  return <ModalWrapper isShow={isShowAddComment} modal={<AddCommentForm />} />;
};
