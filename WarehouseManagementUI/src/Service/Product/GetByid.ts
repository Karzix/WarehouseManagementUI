import type { AppResponse } from "@/Models/AppResponse";
import type { ProductDtos } from "@/Models/Dtos/ProductDtos";
import { axiosInstance } from "@/Service/axiosConfig";
export async function getProduct(Id: any): Promise<AppResponse<ProductDtos>> {
  let result: AppResponse<ProductDtos> = {
    isSuccess: false,
    message: "",
    data: {
      id: undefined,
      name: "",
      description: "",
      quantity: 0,
    },
  };
  await axiosInstance.get(`/Product/${Id}`).then((respone) => {
    console.log(result);
    result = respone.data;
  });
  return result;
}
