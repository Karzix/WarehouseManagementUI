import { axiosInstance } from "../../Service/axiosConfig";
import { AppResponse } from "@/Models/AppResponse";
import { SearchRequest } from "@/Models/Request/ShearchRequest";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { InboundReceiptDtos } from "@/Models/Dtos/InboundReceiptDtos";
import type { OutboundReceiptDtos } from "@/Models/Dtos/OutboundReceiptDtos";

export const SearchOutboundReceipt =async (model:SearchRequest): Promise<AppResponse<SearchResponse<OutboundReceiptDtos>>> =>{
    let result :AppResponse<SearchResponse<OutboundReceiptDtos>>={
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
    await axiosInstance.post("OutboundReceipt/search", model)
    .then((listProduct) => {
      result.data = listProduct.data.data;
      result.isSuccess = listProduct.data.isSuccess;
    });
    }
    catch(ex){
        console.error(ex);
    }
    return result;
}