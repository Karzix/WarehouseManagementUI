import type { SearchRequest } from "@/Models/Request/ShearchRequest";
import { useRoute } from "vue-router";
import { axiosInstance } from "../axiosConfig";
import type { Filter } from "@/Models/Request/Filter";
import type { AppResponse } from "@/Models/AppResponse";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { SupplierProductDtos } from "@/Models/Dtos/SupplierProductDtos";
import router from "@/router";
import type { ProductDtos } from "@/Models/Dtos/ProductDtos";

export async function SearchSupplierProduct(Search: SearchRequest): Promise<AppResponse<SearchResponse<ProductDtos>>> {
  let result: AppResponse<SearchResponse<ProductDtos>> = {
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
    .post("SupplierProduct/search", Search)
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
