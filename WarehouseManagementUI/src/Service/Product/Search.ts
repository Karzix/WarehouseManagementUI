import { axiosInstance } from "../../Service/axiosConfig";
import { AppResponse } from "@/Models/AppResponse";
import { SearchRequest } from "@/Models/Request/ShearchRequest";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { ProductDtos } from "@/Models/Dtos/ProductDtos";

export const SearchProduct =async (model:SearchRequest): Promise<AppResponse<SearchResponse<ProductDtos>>> =>{
    let result :AppResponse<SearchResponse<ProductDtos>>={
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
    try{
    await axiosInstance.post("Product/search", model)
    .then((listProduct) => {
      result.data = listProduct.data.data;
    });
    }
    catch(ex){
        console.error(ex);
    }

    return result;
}