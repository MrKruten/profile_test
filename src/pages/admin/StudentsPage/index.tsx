import React from "react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";

const StudentsPage = () => {
  return <AdminTemplate header={<HeaderAdmin />} navigation={<AdminNav />} />;
};

export default StudentsPage;
