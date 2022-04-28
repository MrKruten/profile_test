import React from "react";
import { Outlet } from "react-router-dom";
import { useStore } from "effector-react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { EditComment } from "features/EditComment";
import { ModalWrapper } from "shared/ui";
import { $isShowEditComment } from "features/EditComment/model";

const AdminPage = () => {
  const isShowEditComment = useStore($isShowEditComment);

  return (
    <>
      <AdminTemplate
        header={<HeaderAdmin />}
        navigation={<AdminNav />}
        main={<Outlet />}
      />
      <ModalWrapper isShow={isShowEditComment} modal={<EditComment />} />
    </>
  );
};

export default AdminPage;
