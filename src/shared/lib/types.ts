export interface IFormAddCommentInputs {
  name: string;
  text: string;
}

export interface IFormAuthInputs {
  login: string;
  password: string;
}

export interface IFormInputs extends IFormAuthInputs, IFormAddCommentInputs {}

export interface IShortComment {
  name: string;
  avatar: "None" | string;
  shortInfo?: string;
}

export interface IComment extends IShortComment {
  date: string;
  text: string;
}

export interface IStatus {
  status: "study" | "expelled" | "finished";
}

export interface IAvatar {
  avatar?: string;
}
