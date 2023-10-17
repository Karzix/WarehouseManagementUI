import type { WarehouseDtos } from "@/Models/Dtos/WarehouseDtos";
import { axiosInstance } from "../../Service/axiosConfig";
import type { AppResponse } from "@/Models/AppResponse";

export const EditWarehouse = async( model: WarehouseDtos): Promise<AppResponse<WarehouseDtos>> => {
  let result: AppResponse<WarehouseDtos> = {
    isSuccess: false,
    message: "",
    data: {
      id: undefined,
      email: "",
      name: "",
      address: "",
      managent: ""
    },
  };
  try {
    await axiosInstance.put(`/Warehouse/${model.id}`,model)
    .then((respone) => {
      console.log(result);
      result = respone.data;
    });
  } catch (ex) {
    console.error(ex);
  }
  return result;
}