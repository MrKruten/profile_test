import React from "react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { Student } from "entities/Student";
import data from "shared/lib/data.json";

const StudentsPage = () => {
  return (
    <AdminTemplate
      header={<HeaderAdmin />}
      navigation={<AdminNav />}
      main={
        <Student
          avatar="None"
          status="study"
          name="Даниил Хазов"
          shortInfo="Люблю пепперони и старые серии смешариков. А вы были на Таити?"
        />
      }
    />
  );
};

export default StudentsPage;
