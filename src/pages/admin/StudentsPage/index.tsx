import React from "react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { StudentsList } from "widgets";

const StudentsPage = () => {
  return (
    <AdminTemplate
      header={<HeaderAdmin />}
      navigation={<AdminNav />}
      textZero="Список участников пуст"
      main={<StudentsList />}
    />
  );
};

export default StudentsPage;
