import type { Filter } from "./Filter"
import type { SortByInfo } from "./SortByInfo"

export class SearchRequest
{
    Filters:Filter[]|undefined

    SortByInfo:SortByInfo|undefined
    PageIndex:number|undefined
    PageSize:number|undefined
}