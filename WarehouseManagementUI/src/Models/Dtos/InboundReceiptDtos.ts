import { ImportProductDtos } from "./ImportProductDtos";
export class InboundReceiptDtos {
    id: number|undefined;
    supplierId:number|undefined;
    supplierName :string|undefined;
    warehouseId :number|undefined;
    warehouseName:string|undefined;
    createOn: Date|undefined;

    listImportProductDto: ImportProductDtos[]|undefined;
}