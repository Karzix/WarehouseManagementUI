import { axiosInstance } from "../../Service/axiosConfig";
import { AppResponse } from "@/Models/AppResponse";
import { SearchRequest } from "@/Models/Request/ShearchRequest";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { InboundReceiptDtos } from "@/Models/Dtos/InboundReceiptDtos";
import type { ImportProductDtos } from "@/Models/Dtos/ImportProductDtos";

export const SearchImportProduct =async (model:SearchRequest): Promise<AppResponse<SearchResponse<ImportProductDtos>>> =>{
    let result :AppResponse<SearchResponse<ImportProductDtos>>={
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
    await axiosInstance.post("ImportProduct/search", model)
    .then((listProduct) => {
      result.data = listProduct.data.data;
    });
    }
    catch(ex){
        console.error(ex);
    }
    return result;
}