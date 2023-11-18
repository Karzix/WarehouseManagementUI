import type { AppResponse } from "@/Models/AppResponse";
import type { WarehouseDtos } from "@/Models/Dtos/WarehouseDtos";
import { axiosInstance } from "@/Service/axiosConfig";
export async function getWarehouse(Id: any): Promise<AppResponse<WarehouseDtos>> {
  let result: AppResponse<WarehouseDtos> = {
    isSuccess: false,
    message: "",
    data: {
      id: undefined,
      name: "",
      address: "",
      managent: "",
      email: ""
    },
  };
  await axiosInstance.get(`/Warehouset/${Id}`).then((respone) => {
    console.log(result);
    result = respone.data;
  });
  return result;
}