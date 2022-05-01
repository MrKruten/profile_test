// eslint-disable-next-line import/no-cycle
import { Types } from "shared/lib";

import { BASE_URL } from "./configure";

const authorization = async (
  loginData: Types.IAuthorization
): Promise<string> => {
  const url = `${BASE_URL}user/signIn`;
  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const response = await request.json();
    if (!request.ok) {
      throw Error(response.message);
    }

    return response.accessToken;
  } catch (e: any) {
    throw Error(e.message);
  }
};

const getCaptcha = async (): Promise<Types.ICaptcha> => {
  const url = `${BASE_URL}reviews/getCaptcha`;
  try {
    const request = await fetch(url, {
      method: "GET",
    });

    const response = await request.json();
    if (!request.ok) {
      throw Error(response.message);
    }

    return response;
  } catch (e: any) {
    throw Error(e.message);
  }
};

const getProfile = async (): Promise<Types.IProfile> => {
  const url = `${BASE_URL}user/getUserProfile`;
  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")!}`,
      },
    });

    const response = await request.json();
    if (!request.ok) {
      throw Error(response.message);
    }

    return response;
  } catch (e: any) {
    throw Error(e.message);
  }
};

const getComments = async (): Promise<Array<Types.IReview>> => {
  const url = `${BASE_URL}reviews/getAll`;
  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")!}`,
      },
    });

    const response = await request.json();
    if (!request.ok) {
      throw Error(response.message);
    }

    return response;
  } catch (e: any) {
    throw Error(e.message);
  }
};

const createComment = async (
  comment: Types.IAddReview
): Promise<Types.IReview> => {
  const url = `${BASE_URL}reviews/create`;
  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")!}`,
      },
      body: JSON.stringify(comment),
    });

    const response = await request.json();
    if (!request.ok) {
      throw Error(response.message);
    }

    return response;
  } catch (e: any) {
    throw Error(e.message);
  }
};

const updatePhotoComment = async (id: string, body: FormData): Promise<any> => {
  const url = `${BASE_URL}reviews/updatePhoto/${id}`;
  try {
    const request = await fetch(url, {
      method: "POST",
      body,
    });

    const response = await request.json();
    if (!request.ok) {
      throw Error(response.message);
    }

    return response;
  } catch (e: any) {
    throw Error(e.message);
  }
};

export const API = {
  authorization,
  getCaptcha,
  getProfile,
  getComments,
  createComment,
  updatePhotoComment,
};
