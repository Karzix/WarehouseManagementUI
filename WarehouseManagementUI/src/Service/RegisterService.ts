import { LoginViewModel } from "../Models/LoginViewModel";

import { AppResponse } from "../Models/AppResponse";

import { axiosInstance } from "./axiosConfig";

import Cookies from "js-cookie";

const loginUrl = 'Account/register';

export const handleLogin = async (
  model: LoginViewModel
): Promise<AppResponse<string>> => {
  let resust: AppResponse<string> = {
    isSuccess: false,
    message: "",
    data: "",
  };

  try {
    const postResult = await axiosInstance.post(loginUrl, model);
    console.log(postResult.data);
    const responseObject = postResult.data;
    resust = responseObject;
    if (resust.isSuccess) {
      if (resust.data != undefined) {
        alert(resust.data);
      }
    } else {
      console.log(resust.message);
    }
  } catch (error) {
    console.error(error);
  }
  return resust;
};
