import type { AppResponse } from "@/Models/AppResponse"
import type { ProductRemainingDtos } from "@/Models/Dtos/ProductRemainingDtos"
import type { SearchResponse } from "@/Models/Request/SearchResponse"
import type { SearchRequest } from "@/Models/Request/ShearchRequest"
import { axiosInstance } from "../axiosConfig"


export const SearchProductRemainming = async (model:SearchRequest):Promise<AppResponse<SearchResponse<ProductRemainingDtos>>>=>{
    let result: AppResponse<SearchResponse<ProductRemainingDtos>> = {
        isSuccess: false,
        message: "",
        data: {
          data: undefined,
          totalPages: undefined,
          rowsPerPage: undefined,
          totalRows: undefined,
          currentPage: undefined,
        },
      };
      try{
        await axiosInstance
        .post("ProductRemaining/search", model)
        .then((response) => {
          // console.log(result.data);
          result = response.data;
        });
        if(result.isSuccess){
            
        }
        else{
          console.log(result.message);
        }
      }
      catch(ex){
        console.error(ex);
      }
    
      return result;
}