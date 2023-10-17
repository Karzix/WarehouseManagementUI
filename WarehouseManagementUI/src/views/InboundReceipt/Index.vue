<template>
  <el-table :data="tableData.data?.data" style="width: 100%">
    <el-table-column prop="supplierName" label="Supplier" width="180" />
    <el-table-column prop="warehouseName" label="Warehouse" width="180" />
    <el-table-column prop="createdOn" label="CreateOn">
      <template #default="{ row }">
        {{ new Date(row.createdOn).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { ImportProductDtos } from "../../Models/Dtos/ImportProductDtos";
import { InboundReceiptDtos } from "../../Models/Dtos/InboundReceiptDtos";
//@ts-ignore
import { AppResponse } from "@/Models/AppResponse";
import type { Filter } from "@/Models/Request/Filter";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import { SearchInboundReceipt } from "../../Service/InboundReceipt/Search";
import type { SearchRequest } from "@/Models/Request/ShearchRequest";
import { el } from "element-plus/lib/locale/index.js";

const tableData = ref<AppResponse<SearchResponse<InboundReceiptDtos>>>({
  isSuccess: false,
  data: {
    data: undefined,
    currentPage: undefined,
    totalPages: undefined,
    rowsPerPage: undefined,
    totalRows: undefined,
  },
  message: "",
});
let searchRequest: SearchRequest = reactive({
  Filters: [
    {
      FieldName: "IsDelete",
      Value: "",
    },
  ] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 10,
});
SearchInboundReceipt(searchRequest).then((resule) => {
  tableData.value = resule;
  console.log(tableData.value.data?.data);
});
</script>
