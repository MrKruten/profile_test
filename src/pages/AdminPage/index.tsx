import React from "react";
import { Outlet } from "react-router-dom";
import { useStore } from "effector-react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { EditComment, EditCommentModel } from "features/EditCommentForm";
import { ModalWrapper } from "shared/ui";
import { Loader } from "shared/ui/Loader";

const AdminPage = () => {
  const isShowEditComment = useStore(EditCommentModel.$isShowEditComment);
  const isLoadingEditComment = useStore(
    EditCommentModel.updateTextCommentFx.pending
  );

  return (
    <>
      <AdminTemplate
        header={<HeaderAdmin />}
        navigation={<AdminNav />}
        main={<Outlet />}
      />
      <ModalWrapper
        isShow={isShowEditComment}
        modal={isLoadingEditComment ? <Loader /> : <EditComment />}
      />
    </>
  );
};

export default AdminPage;
