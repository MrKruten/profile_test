export interface IFormAddCommentInputs {
  name: string;
  text: string;
}

export interface IFormAuthInputs {
  login: string;
  password: string;
}

type TSelect = {
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

export interface IStudent {
  name: string;
  avatar: "None" | string;
  shortInfo?: string;
}

export interface IComment extends IStudent {
  date: string;
  text: string;
}

export interface IStatus {
  status?: "study" | "expelled" | "finished";
}

export interface IAvatar {
  avatar?: string;
}

export interface IUser {
  firstName: string;
  secondName: string;
  avatar: string;
  description: {
    city: string;
    sex: string;
    age: number;
    dateBirth: string;
    text: string;
    pet: boolean;
    shortInfo: string;
  };
}
