import type { AppResponse } from "@/Models/AppResponse";
import type { SupplierDtos } from "@/Models/Dtos/SupplierDtos";
import { axiosInstance } from "@/Service/axiosConfig";
export async function getSupplier(Id: any): Promise<AppResponse<SupplierDtos>> {
    let result :AppResponse<SupplierDtos>={
        isSuccess : false,
        message : "",
        data : {
            id: null,
            email: "",
            name: ""
        }
    };
    await axiosInstance.get(`/Supplier/${Id}`,)
    .then(respone =>{
      console.log(result)
      result = respone.data
    })
    return result;
  }