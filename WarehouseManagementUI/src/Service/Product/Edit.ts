import type {ProductDtos } from "@/Models/Dtos/ProductDtos";
import { axiosInstance } from "../../Service/axiosConfig";
import type { AppResponse } from "@/Models/AppResponse";

export const EditProduct = async( model: ProductDtos): Promise<AppResponse<ProductDtos>> => {
  let result: AppResponse<ProductDtos> = {
    isSuccess: false,
    message: "",
    data: {
      id: null,
      description: "",
      name: "",
      quantity: 0,
    },
  };
  try {
    await axiosInstance.put(`/Product/${model.id}`,model)
    .then((respone) => {
      console.log(result);
      result = respone.data;
    });
  } catch (ex) {
    console.error(ex);
  }
  return result;
}
