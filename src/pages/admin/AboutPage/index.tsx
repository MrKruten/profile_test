import React from "react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { AboutUser } from "widgets/AboutUser";

const AboutPage = () => {
  return (
    <AdminTemplate
      header={<HeaderAdmin />}
      navigation={<AdminNav />}
      main={<AboutUser />}
    />
  );
};

export default AboutPage;
