export class SearchDTOItem {
    [key: string]: any;
    constructor(columns:TableColumn[]){
        columns.forEach(column => {
            this[column.key]= "";
        });
    }
}

import {TableColumn} from "./TableColumn"