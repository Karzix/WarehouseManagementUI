import type { AppResponse } from "@/Models/AppResponse";
import { axiosInstance } from "../axiosConfig";
import type { ImportProductDtos } from "@/Models/Dtos/ImportProductDtos";

 
export const CreateInportProduct = async (importProduct:ImportProductDtos): Promise<AppResponse<ImportProductDtos>> =>{
    let resust: AppResponse<ImportProductDtos> = {
        isSuccess: false,
        message: "",
        data: importProduct
      };
    console.log(importProduct)
        try{
            var respons =  await axiosInstance.post('ImportProduct', importProduct);
            resust.data = respons.data.data;
            resust.message = respons.data.message;
            resust.isSuccess = respons.data.isSuccess;
            if(resust.isSuccess){
                
            }
            else{
                alert(resust.message);
            }
        }
        catch(ex){
            alert("Create fail");
        }
        return resust;
}