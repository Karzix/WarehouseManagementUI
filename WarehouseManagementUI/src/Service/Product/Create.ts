import type { AppResponse } from "@/Models/AppResponse";
import { ProductDtos } from "@/Models/Dtos/ProductDtos";
import { axiosInstance } from "../axiosConfig";

 
export const CreateProduct = async (Product:ProductDtos): Promise<AppResponse<ProductDtos>> =>{
    let resust: AppResponse<ProductDtos> = {
        isSuccess: false,
        message: "",
        data: Product
      };
    console.log(Product)
        try{
            var respons =  await axiosInstance.post('Product', Product);
            resust.data = respons.data.data;
            resust.message = respons.data.message;
            resust.isSuccess = respons.data.isSuccess;
            if(resust.isSuccess){
            window.location.href = '/Product';
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