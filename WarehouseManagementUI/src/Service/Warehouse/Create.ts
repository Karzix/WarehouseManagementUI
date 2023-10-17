import type { AppResponse } from "@/Models/AppResponse";
import { axiosInstance } from "../axiosConfig";
import type { WarehouseDtos } from "@/Models/Dtos/WarehouseDtos";

 
export const CreateWarehouse = async (Warehouse:WarehouseDtos): Promise<AppResponse<WarehouseDtos>> =>{
    let resust: AppResponse<WarehouseDtos> = {
        isSuccess: false,
        message: "",
        data: Warehouse
      };
    console.log(Warehouse)
        try{
            var respons =  await axiosInstance.post('Warehouse', Warehouse);
            resust.data = respons.data.data;
            resust.message = respons.data.message;
            resust.isSuccess = respons.data.isSuccess;
            if(resust.isSuccess){
            window.location.href = '/Warehouse';
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