import { LoginViewModel } from "../Models/LoginViewModel";

import { AppResponse } from "../Models/AppResponse";

import { axiosInstance } from "./axiosConfig";


const Url = 'Account/register';

export const register = async (
  model: LoginViewModel
): Promise<AppResponse<string>> => {
  let resust: AppResponse<string> = {
    isSuccess: false,
    message: "",
    data: "",
  };

  try {
    const postResult = await axiosInstance.post(Url, model);
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
