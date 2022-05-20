import React from "react";
import { FieldErrors } from "react-hook-form";

import { Types } from "shared/constants";
import { Button } from "shared/ui";
import infoImg from "shared/images/Info_Square.svg";

import "./style.scss";

interface ISubmitBlock {
  errors: FieldErrors<Types.IFormInputs>;
}

export const SubmitBlock: React.FC<ISubmitBlock> = ({ errors }) => {
  return (
    <div className="add-comment__submit">
      <Button
        type="submit"
        disabled={!!errors.text || !!errors.name || !!errors.captcha}
      >
        Отправить отзыв
      </Button>
      <div className="add-comment__info">
        <img src={infoImg} alt="Информация" />
        <span>Все отзывы проходят модерацию в течение 2 часов</span>
      </div>
    </div>
  );
};
