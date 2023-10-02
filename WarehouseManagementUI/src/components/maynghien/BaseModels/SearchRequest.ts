// @ts-ignore
import Filter from "../../../Models/Maynghien/Models/Request/SearchModels/Filter.js";
// @ts-ignore
import SortByInfo from "../../../Models/Maynghien/Models/Request/SearchModels/SortByInfo.js";


export class SearchRequest {
    
    PageIndex: number | undefined;
    PageSize:number |undefined;
    filters:Filter[]|undefined;
    SortByInfo:SortByInfo|undefined;
}