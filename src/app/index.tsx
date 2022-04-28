import React from "react";

import { Router } from "pages";
import { Notification } from "entities/Notification";
import { BottomNotification } from "entities/BottomNotification";

import { withProviders } from "./providers";

const App = () => {
  return (
    <>
      <Router />
      <Notification />
      <BottomNotification />
    </>
  );
};

export default withProviders(App);
