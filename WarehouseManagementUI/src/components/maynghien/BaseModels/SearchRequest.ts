
import {Filter} from "../../maynghien/BaseModels/Filter";
import {SortByInfo} from "../../maynghien/BaseModels/SortByInfo";


export class SearchRequest {
    
    PageIndex: number | undefined;
    PageSize:number |undefined;
    filters:Filter[]|undefined;
    SortByInfo:SortByInfo|undefined;
}