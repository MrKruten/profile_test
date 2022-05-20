import React, { useRef } from "react";

import { Avatar } from "shared/ui";
import { ReactComponent as Edit } from "shared/images/Edit.svg";
import { BottomNotificationModel } from "entities/BottomNotification";
import { Types } from "shared/constants";

import { uploadPhotoProfile } from "../../model";

import "./style.scss";

interface IAvatarAboutUserForm {
  user: Types.IProfile;
}

export const AvatarAboutUserForm: React.FC<IAvatarAboutUserForm> = ({
  user,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const readFile = (input: FileList | null) => {
    if (!input) return;
    BottomNotificationModel.showBottomNotification(false);
    const file = input[0];
    const readerURL = new FileReader();
    readerURL.readAsDataURL(file);

    readerURL.onload = () => {
      if (file.size / 1024 / 1024 > 5) {
        BottomNotificationModel.showBottomNotification(true);
        setTimeout(
          () => BottomNotificationModel.showBottomNotification(false),
          4000
        );
      } else {
        const formData = new FormData();
        formData.set("profileImage", inputFileRef.current?.files?.[0]!);
        uploadPhotoProfile(formData);
      }
    };
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      readFile(e.target.files);
    }
  };

  return (
    <div className="about-form__avatar">
      <div className="about-form__photo">
        <Avatar avatar={user.profileImage} />
        <div className="avatar-big">
          <Avatar avatar={user.profileImage} />
        </div>
      </div>
      <div className="about-form__avatar-info">
        <p className="about-form__photo-text">Фото профиля</p>
        <div className="input__wrapper">
          <label htmlFor="avatar" className="input__file-button">
            <input
              type="file"
              className="input input__file"
              id="avatar"
              accept="image/*"
              ref={inputFileRef}
              onChange={onChangeFile}
            />
            <span className="input__file-icon-wrapper">
              <Edit />
            </span>
            <span className="input__file-button-text">Загрузить фото</span>
          </label>
        </div>
      </div>
    </div>
  );
};
