import type { ProductDtos } from "@/Models/Dtos/ProductDtos"
import { axiosInstance } from "../../Service/axiosConfig";
import type { AppResponse } from "@/Models/AppResponse";
import router from "@/router";

export const DeleteProduct = async (Id:string) : Promise<AppResponse<String>>=>{
    let result: AppResponse<string> = {
        isSuccess: false,
        message: "",
        data: "",
      };
      try{
        await axiosInstance.delete(`Product/${Id}`)
        .then(respone =>{
            result = respone.data
            window.location.href = `/Product`;
        })
      }
      catch(ex){
        console.error(ex);
      }
    return result;
}