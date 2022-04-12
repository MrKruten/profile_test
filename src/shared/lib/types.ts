export interface IFormAddCommentInputs {
  name: string;
  text: string;
}

export interface IFormAuthInputs {
  login: string;
  password: string;
}

export interface IFormInputs extends IFormAuthInputs, IFormAddCommentInputs {}

export interface IComment {
  name: string;
  avatar: "None" | string;
  date: string;
  text: string;
}
