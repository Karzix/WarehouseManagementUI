import { ProductRemainingDtos } from "@/Models/Dtos/ProductRemainingDtos";
import { axiosInstance } from "../axiosConfig";
import { AppResponse } from "@/Models/AppResponse";
import { GetProductremainming } from "./GetProductremainming";
import type { SearchResponse } from "@/Models/Request/SearchResponse";

export const UpdateProductRemainming = async (model: ProductRemainingDtos): Promise<AppResponse<ProductRemainingDtos>> => {
  var result: AppResponse<ProductRemainingDtos> = {
    isSuccess: false,
    message: "",
    data: undefined,
  };
  try {
    var check :AppResponse<SearchResponse<ProductRemainingDtos>> ={
        isSuccess: false,
        message: "",
        data: {
          data: [] as ProductRemainingDtos[],
          currentPage: undefined,
          totalPages: undefined,
          rowsPerPage: undefined,
          totalRows: undefined
        },
    }
    await GetProductremainming(model).then((res) => {
      check = res;
    });
    console.log(check);
    if (check.data?.data?.length) {
      //cập nhật lại số lượng
        model.quantity = Number(check.data?.data[0].quantity) + Number(model.quantity);
        model.id = Number(check.data?.data[0].id);
        var edit =await axiosInstance.put("ProductRemaining" + "/" + check.data?.data[0].id, model);
        console.log(edit);
    } else {
        //tạo mới
      await axiosInstance.post("ProductRemaining", model).then((res) => {
        result = res.data;
      });
      if (!result.isSuccess) {
        console.log(result.message);
      }
    }
  } catch (ex) {
    console.error(ex);
  }
  return result;
};
