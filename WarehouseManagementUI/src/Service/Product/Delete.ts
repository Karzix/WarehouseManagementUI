import type { ProductDtos } from "@/Models/Dtos/ProductDtos"
import { axiosInstance } from "../../Service/axiosConfig";
import type { AppResponse } from "@/Models/AppResponse";
import router from "@/router";

export const DeleteProduct = async (Id:Number) : Promise<AppResponse<Number>>=>{
    let result: AppResponse<Number> = {
        isSuccess: false,
        message: "",
        data: undefined,
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