import type { ImportProductDtos } from "@/Models/Dtos/ImportProductDtos";
import { axiosInstance } from "../../Service/axiosConfig";
import type { AppResponse } from "@/Models/AppResponse";

export const EditImportProduct = async( model: ImportProductDtos): Promise<AppResponse<ImportProductDtos>> => {
  let result: AppResponse<ImportProductDtos> = {
    isSuccess: false,
    message: "",
    data: {
      id: undefined,
      quantity: 0,
      supplierProductId: undefined,
      supplierProductName: "",
      inboundReceiptId: undefined,
      inboundReceiptName: "",
    },
  };
  try {
    await axiosInstance.put(`/ImportProduct/${model.id}`,model)
    .then((respone) => {
      console.log(result);
      result = respone.data;
    });
  } catch (ex) {
    console.error(ex);
  }
  return result;
}
