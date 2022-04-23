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

export interface IComment {
  name: string;
  avatar: "None" | string;
  date: string;
  text: string;
  status?: "editable" | "rejected" | "published" | string;
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
