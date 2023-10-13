<template>
    <el-table :data="tableData.data?.data" style="width: 100%">
    <el-table-column prop="supplierName" label="Supplier" width="180" />
    <el-table-column prop="warehouseName" label="Warehouse" width="180" />
    <el-table-column prop="createdOn" label="CreateOn" />
  </el-table>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import {ImportProductDtos } from '../../Models/Dtos/ImportProductDtos'
import {InboundReceiptDtos } from '../../Models/Dtos/InboundReceiptDtos'
//@ts-ignore
import {AppResponse } from '@/Models/AppResponse'
import type { SearchRequest } from "@/components/maynghien/BaseModels/SearchRequest";
import type { Filter } from "@/Models/Request/Filter";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import { SearchInboundReceipt } from '../../Service/InboundReceipt/Search';

const tableData = ref<AppResponse<SearchResponse<InboundReceiptDtos>>>({
  isSuccess:false,
  data : {
    data: undefined,
    currentPage: undefined,
    totalPages: undefined,
    rowsPerPage: undefined,
    totalRows: undefined
  },
  message: ""
})
let searchRequest: SearchRequest = reactive({
  Filters: [{
    FieldName: "IsDelete",
    Value: ""
  }] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 10 ,
})
SearchInboundReceipt(searchRequest).then(resule =>{
  tableData.value = resule
  console.log(tableData.value.data?.data)
}
)

</script>