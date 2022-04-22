import React from "react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";

const CommentsPage = () => {
  return (
    <AdminTemplate
      header={<HeaderAdmin />}
      navigation={<AdminNav />}
      isZero
      textZero="Список отзывов пуст"
      main={<div />}
    />
  );
};

export default CommentsPage;
