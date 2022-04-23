import React from "react";
import { useStore } from "effector-react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { StudentsList } from "widgets";
import { $students } from "shared/lib";

const StudentsPage = () => {
  const students = useStore($students);

  return (
    <AdminTemplate
      header={<HeaderAdmin />}
      navigation={<AdminNav />}
      textZero="Список участников пуст"
      isZero={students.length === 0}
      main={<StudentsList />}
    />
  );
};

export default StudentsPage;
