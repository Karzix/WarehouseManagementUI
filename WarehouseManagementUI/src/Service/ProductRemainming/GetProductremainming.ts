import type { AppResponse } from "@/Models/AppResponse";
import type { ProductRemainingDtos } from "@/Models/Dtos/ProductRemainingDtos";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { SearchRequest } from "@/Models/Request/ShearchRequest";
import { axiosInstance } from "../axiosConfig";

export const GetProductremainming = async(model:ProductRemainingDtos) : Promise<AppResponse<SearchResponse<ProductRemainingDtos>>> =>{
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
    var search :SearchRequest ={
        Filters:[
            {
                FieldName:"ProductId",
                Value:model.productId?.toString(),
                Operation:"eq"
            },
            {
                FieldName:"WarehouseId",
                Value:model.warehouseId?.toString(),
                Operation:"eq"
            }
        ],
        PageIndex:1,
        PageSize:1,
        SortByInfo:undefined
    }
    try{
        await axiosInstance.post("ProductRemaining/search",search).then((res)=>{
            result = res.data;
        });
    }
    catch(ex){
        console.error(ex);
    }
    return result;
}