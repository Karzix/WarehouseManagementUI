import Filter from "../Request/SearchModels/Filter";
import SortByInfo from "../Request/SearchModels/SortByInfo.js";


export class SearchRequest {
    
    PageIndex: number | undefined;
    PageSize:number |undefined;
    filters:Filter[]|undefined;
    SortByInfo:SortByInfo|undefined;
}