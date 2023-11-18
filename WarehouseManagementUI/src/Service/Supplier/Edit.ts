import type { SupplierDtos } from "@/Models/Dtos/SupplierDtos";
import { axiosInstance } from "../../Service/axiosConfig";
import type { AppResponse } from "@/Models/AppResponse";

export const EditSupplier = async( model: SupplierDtos): Promise<AppResponse<SupplierDtos>> => {
  let result: AppResponse<SupplierDtos> = {
    isSuccess: false,
    message: "",
    data: {
      id: null,
      email: "",
      name: "",
    },
  };
  try {
    await axiosInstance.put(`/Supplier/${model.id}`,model)
    .then((respone) => {
      console.log(result);
      result = respone.data;
    });
  } catch (ex) {
    console.error(ex);
  }
  return result;
}
