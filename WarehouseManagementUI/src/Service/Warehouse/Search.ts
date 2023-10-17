import { axiosInstance } from "../../Service/axiosConfig";
import { AppResponse } from "@/Models/AppResponse";
import { SearchRequest } from "@/Models/Request/ShearchRequest";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { WarehouseDtos } from "@/Models/Dtos/WarehouseDtos";

export const SearchWarehouse =async (model:SearchRequest): Promise<AppResponse<SearchResponse<WarehouseDtos>>> =>{
    let result :AppResponse<SearchResponse<WarehouseDtos>>={
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
    await axiosInstance.post("Warehouse/search", model)
    .then((listProduct) => {
      result.data = listProduct.data.data;
    });
    }
    catch(ex){
        console.error(ex);
    }

    return result;
}