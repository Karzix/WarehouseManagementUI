import type { AppResponse } from "@/Models/AppResponse";
import { ProductDtos } from "@/Models/Dtos/ProductDtos";
import { axiosInstance } from "../axiosConfig";
import type { SupplierDtos } from "@/Models/Dtos/SupplierDtos";

 
export const CreateSupplier = async (Supplier:SupplierDtos): Promise<AppResponse<SupplierDtos>> =>{
    let resust: AppResponse<SupplierDtos> = {
        isSuccess: false,
        message: "",
        data: Supplier
      };
    console.log(Supplier)
        try{
            var respons =  await axiosInstance.post('Supplier', Supplier);
            resust.data = respons.data.data;
            resust.message = respons.data.message;
            resust.isSuccess = respons.data.isSuccess;
            if(resust.isSuccess){
            window.location.href = '/Supplier';
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