import type { SupplierDtos } from "@/Models/Dtos/SupplierDtos";
import { axiosInstance } from "../../Service/axiosConfig";
import type { AppResponse } from "@/Models/AppResponse";
import router from "@/router";

export const Delete = async (Id:string) : Promise<AppResponse<String>>=>{
    let result: AppResponse<string> = {
        isSuccess: false,
        message: "",
        data: "",
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