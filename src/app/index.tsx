import React from "react";

import { Button, ArrowButton, DefaultAvatar, Input } from "shared/ui";

const App = () => {
  return (
    <div className="App">
      <ArrowButton onClick={() => {}} rotated />
      <Button onClick={() => {}}>Button </Button>
      <DefaultAvatar />
      <Input label="Who you?" placeholder="Input info jef" name="fio" />
    </div>
  );
};

export default App;
