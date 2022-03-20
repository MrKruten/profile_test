import React from "react";

import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input";
import { ArrowButton } from "shared/ui/ArrowButton";
import { DefaultAvatar } from "shared/ui/DefaultAvatar";

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
