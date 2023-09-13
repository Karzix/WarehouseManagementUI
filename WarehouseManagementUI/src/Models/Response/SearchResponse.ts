export class SearchResponse<T>{
    Data:T|undefined;
    CurrentPage:number|undefined;
    TotalPages:number|undefined;
    RowsPerPage:number|undefined;
    TotalRows:number|undefined;
}