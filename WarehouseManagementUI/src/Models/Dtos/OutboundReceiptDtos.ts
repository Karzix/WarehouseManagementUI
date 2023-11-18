import type { ExportProductDtos } from "./ExportProductDtos";

export class OutboundReceiptDtos {
    id: number|undefined;
    to:string|undefined;
    warehouseId:number|undefined;
    warehouseName :string|undefined;

    listExportProductDtos: ExportProductDtos[]|undefined;
}