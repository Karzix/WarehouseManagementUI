import type { SupplierDtos } from "@/Models/Dtos/SupplierDtos";
import { axiosInstance } from "../../Service/axiosConfig";
import type { AppResponse } from "@/Models/AppResponse";
import router from "@/router";

export const Delete = async (Id:Number) : Promise<AppResponse<Number>>=>{
    let result: AppResponse<Number> = {
        isSuccess: false,
        message: "",
        data: undefined
      };
      try{
        await axiosInstance.delete(`Supplier/${Id}`)
        .then(respone =>{
            result = respone.data
            window.location.href = `/Supplier`;
        })
      }
      catch(ex){
        console.error(ex);
      }
    return result;
}