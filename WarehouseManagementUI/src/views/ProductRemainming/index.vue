<template>
  <el-table :data="tableData.data?.data" border style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="productName" label="Tên sản phẩm" width="180" />
    <el-table-column prop="supplierName" label="Nhà cung cấp" />
    <el-table-column prop="quantity" label="Số lượng" />
  </el-table>
  <div style="display: flex">
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="totalItem"
      :page-size="10"
      @current-change="handlePageChange"
      :current-page="searchRequest.PageIndex"
      class="mt-4"
    />
    Found {{ totalItem }} results. Page {{ searchRequest.PageIndex }} of total
    {{ totalPages }} pages
  </div>
</template>
<script setup lang="ts">
import { AppResponse } from "@/Models/AppResponse";
import type { ProductRemainingDtos } from "@/Models/Dtos/ProductRemainingDtos";
import type { Filter } from "@/Models/Request/Filter";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { SearchRequest } from "@/Models/Request/ShearchRequest";
import { SearchProductRemainming } from "@/Service/ProductRemainming/Search";
import { axiosInstance } from "@/Service/axiosConfig";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const tableData = ref<AppResponse<SearchResponse<ProductRemainingDtos>>>({
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
      Value: "false",
      Operation: "search",
    },
  ] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 10,
});
const totalPages = ref(0);
const totalItem = ref(10);
const FetchData = async () => {
  var WarehouseId = useRoute().params.Id.toString();
  FindFilter("WarehouseId", WarehouseId);
  SearchProductRemainming(searchRequest).then((resule) => {
    tableData.value = resule;
    console.log(tableData.value.data?.data);
    console.log(tableData.value);
    if (resule.data?.totalPages != undefined)
      totalPages.value = resule.data?.totalPages;
    else totalPages.value = 0;
    if (resule.data?.totalRows != undefined) {
      totalItem.value = resule.data?.totalRows;
    } else totalItem.value = 0;
  });
};
FetchData();
async function handlePageChange(value: number) {
  searchRequest.PageIndex = value;
  await FetchData();
}
function FindFilter(FieldName: string, value: string) {
  var j = -1;
  for (var i = 0; i < (searchRequest.Filters ?? []).length; i++) {
    if ((searchRequest.Filters ?? [])[i].FieldName == FieldName) {
      (searchRequest.Filters ?? [])[i].Value = value;
      j = i;
      break;
    }
  }
  if (j == -1) {
    searchRequest.Filters = [
      {
        FieldName: "IsDelete",
        Value: "",
        Operation: undefined,
      },
    ];
    searchRequest.Filters?.push({
      FieldName: FieldName,
      Value: value,
      Operation: undefined,
    });
  }
}
</script>
