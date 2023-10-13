import { ImportProductDtos } from "./ImportProductDtos";
export class InboundReceiptDtos {
    id: string|undefined;
    SupplierId:string|undefined;
    SupplierName :string|undefined;
    WarehouseId :string|undefined;
    WarehouseName:string|undefined;
    CreateOn: Date|undefined;

    ListImportProduct: ImportProductDtos[]|undefined;
}