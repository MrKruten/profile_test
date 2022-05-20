import React from "react";
import classnames from "classnames";

import fileImg from "shared/images/File.svg";
import { ReactComponent as DeleteImg } from "shared/images/Delete.svg";
import "./style.scss";

interface IFileBar {
  isError?: boolean;
  deleteFile: () => void;
  errorMessage: string;
  fileName: string;
}

export const FileBar: React.FC<IFileBar> = ({
  isError = false,
  deleteFile,
  errorMessage = "Ошибка загрузки",
  fileName,
}) => {
  return (
    <div className="add-comment__file">
      <img src={fileImg} alt="Файл" />
      <div className="add-comment__name-load">
        <p className={isError ? "add-comment__name-load_error" : ""}>
          {isError ? errorMessage : fileName}
        </p>
        <div className="add-comment__stripe">
          <div className="add-comment__bar" />
          <div
            className={classnames("add-comment__load", {
              "add-comment__load_error": isError,
            })}
          />
        </div>
      </div>
      <button onClick={deleteFile} type="button">
        <DeleteImg />
      </button>
    </div>
  );
};
