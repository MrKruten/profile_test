import React from "react";

import { AdminTemplate } from "shared/ui/templates/AdminTemplate";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";

const AdminPage = () => {
  return <AdminTemplate header={<HeaderAdmin />} navigation={<AdminNav />} />;
};

export default AdminPage;
