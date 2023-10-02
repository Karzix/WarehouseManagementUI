import { SupplierDtos } from "@/Models/Dtos/SupplierDtos";
import { axiosInstance } from "../../Service/axiosConfig";
import { AppResponse } from "@/Models/AppResponse";
import type { SearchRequest } from "@/Models/Request/ShearchRequest";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
export const fetchData = async (model:SearchRequest) : Promise<AppResponse<SearchResponse<SupplierDtos>>> => {
    let result :AppResponse<SearchResponse<SupplierDtos>>={
        isSuccess : false,
        message : "",
        data : {
          data: undefined,
          totalPages: undefined,
          rowsPerPage: undefined,
          totalRows: undefined,
          currentPage: undefined
        }
    };

    try {
    await axiosInstance.post("Supplier/search", model)
    .then((listProduct) => {
      result.data = listProduct.data.data;
    });
    }
    catch(error){
        console.log(error)
    }
    return result;
    // return respone;
  };