import {
  IAuthorization,
  ICaptcha,
  IProfile,
  IUpdateProfile,
  IAddReview,
  IReview,
  TStatus,
} from "shared/constants/types";

import { BASE_URL } from "./configure";

const authorization = async (loginData: IAuthorization): Promise<string> => {
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

const getCaptcha = async (): Promise<ICaptcha> => {
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

const getProfile = async (): Promise<IProfile> => {
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

const updatePhotoProfile = async (profileImage: FormData): Promise<any> => {
  const url = `${BASE_URL}user/updatePhoto`;
  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")!}`,
      },
      body: profileImage,
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

const updateProfile = async (updateInfo: IUpdateProfile): Promise<any> => {
  const url = `${BASE_URL}user/updateInfo`;
  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")!}`,
      },
      body: JSON.stringify(updateInfo),
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

const getStudents = async (): Promise<Array<IProfile>> => {
  const url = `${BASE_URL}user/getAll`;
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

const getComments = async (): Promise<Array<IReview>> => {
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

const createComment = async (comment: IAddReview): Promise<IReview> => {
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

const updateTextComment = async (
  id: string,
  text: string
): Promise<IReview> => {
  const url = `${BASE_URL}reviews/updateInfo/${id}`;
  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")!}`,
      },
      body: JSON.stringify({ text }),
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

const updateStatusComment = async (
  id: string,
  status: TStatus
): Promise<any> => {
  const url = `${BASE_URL}reviews/updateStatus/${id}`;
  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")!}`,
      },
      body: JSON.stringify({ status }),
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

const updatePhotoComment = async (
  id: string,
  authorImage: FormData
): Promise<any> => {
  const url = `${BASE_URL}reviews/updatePhoto/${id}`;
  try {
    const request = await fetch(url, {
      method: "POST",
      body: authorImage,
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
  getStudents,
  updateTextComment,
  updateStatusComment,
  updatePhotoProfile,
  updateProfile,
};
