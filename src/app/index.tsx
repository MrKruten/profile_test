import React from "react";

import { Router } from "pages";

import { withProviders } from "./providers";

const App = () => {
  return <Router />;
};

export default withProviders(App);
