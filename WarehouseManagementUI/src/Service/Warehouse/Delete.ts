import { axiosInstance } from "../../Service/axiosConfig";
import type { AppResponse } from "@/Models/AppResponse";
import router from "@/router";

export const DeleteWarehouse = async (Id:Number) : Promise<AppResponse<Number>>=>{
    let result: AppResponse<Number> = {
        isSuccess: false,
        message: "",
        data: undefined,
      };
      try{
        await axiosInstance.delete(`Warehouse/${Id}`)
        .then(respone =>{
            result = respone.data
            window.location.href = `/Warehouse`;
        })
      }
      catch(ex){
        console.error(ex);
      }
    return result;
}