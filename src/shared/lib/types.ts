export interface IFormAddCommentInputs {
  name: string;
  text: string;
}

export interface IFormAuthInputs {
  login: string;
  password: string;
  captcha: string;
}

export type TSelect = {
  label: string;
  value: string;
};

export interface IFormAboutUserInputs {
  firstName: string;
  secondName: string;
  dateBirth: string;
  city: TSelect;
  sex: TSelect;
  pet: TSelect;
  text: string;
  shortInfo: string;
}

export interface IFormInputs
  extends IFormAuthInputs,
    IFormAddCommentInputs,
    IFormAboutUserInputs {}

export interface IAddReview {
  authorName: string;
  title: string;
  text: string;
  captchaKey: string;
  captchaValue: string;
}

export type TStatus = "onCheck" | "approved" | "declined";

export interface IReview {
  id?: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  version?: number;
  authorImage: string | null;
  authorName: string;
  title?: string;
  text: string;
  status?: TStatus;
}

export interface IStudent {
  firstName: string;
  secondName: string;
  avatar: "None" | string;
  shortInfo: string;
  status?: "study" | "expelled" | "finished" | string;
}

export interface IAvatar {
  avatar?: string;
}

export interface IProfile {
  firstName: string;
  lastName: string;
  profileImage?: string;
  birthDate: string;
  gender: "male" | "female";
  cityOfResidence: string;
  favoriteFood: string | null;
  hasPet: boolean;
  petType: string | null;
  petName: string | null;
  aboutMe: string;
  smallAboutMe: string | null;
  academyStatus: "studies";
  // add academy status
}

export interface IAuthorization {
  email: string;
  password: string;
}

export interface ICaptcha {
  base64Image: string;
  key: string;
}

export interface IUploadImage {
  id: string;
  authorImage: FormData;
}
