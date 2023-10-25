import type { AppResponse } from "@/Models/AppResponse";
import type { ExportProductDtos } from "@/Models/Dtos/ExportProductDtos";
import { axiosInstance } from "../axiosConfig";
import router from "@/router";

export const CreateExportProduct = async (model: ExportProductDtos):Promise<AppResponse<ExportProductDtos>> => {
  let result: AppResponse<ExportProductDtos> = {
    isSuccess: false,
    message: "",
    data: model,
  };
  console.log(model);
  try {
    var respons = await axiosInstance.post("ExportProduct", model);
    result.data = respons.data.data;
    result.message = respons.data.message;
    result.isSuccess = respons.data.isSuccess;
    if (result.isSuccess) {
        
    } else {
      alert(result.message);
    }
  } catch (ex) {
    alert("Create fail");
  }
  return result;
};
