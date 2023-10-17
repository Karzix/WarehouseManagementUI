<template>
  <el-table :data="Data.data?.data" style="width: 100%">
    <el-table-column prop="id" label="id" width="280px" />
    <el-table-column prop="name" label="Name" width="280px" />
    <el-table-column prop="email" label="Email" width="280px" />
    <el-table-column prop="address" label="address" width="280px" />
    <el-table-column prop="managent" label="managent" width="280px" />
  </el-table>
  <h1>danh sách các sản phẩm + số lượng trong kho</h1>
  <p>chưa thực hiện</p>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { WarehouseDtos } from "@/Models/Dtos/WarehouseDtos";
import { SearchWarehouse } from "../../Service/Warehouse/Search";
import type { SearchRequest } from "@/components/maynghien/BaseModels/SearchRequest";
import type { Filter } from "@/Models/Request/Filter";
import type { AppResponse } from "@/models/AppResponse";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { ProductDtos } from "@/Models/Dtos/ProductDtos";
// import { SearchProduct } from "@/Service/Product/Search";
// import { useRoute } from "vue-router";
var Data = ref<AppResponse<SearchResponse<WarehouseDtos>>>({
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
var DataProduct = ref<AppResponse<SearchResponse<ProductDtos>>>({
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
SearchWarehouse(searchRequest).then((resule) => {
  Data.value = resule;
});

let searchRequestProduct: SearchRequest = reactive({
  Filters: [
    {
      FieldName: "IsDelete",
      Value: "",
    },
    // {
    //   FieldName: "WarehouseId",
    //   Value: String(useRoute().params.Id),
    // },
  ] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 10,
});
// SearchProduct(searchRequestProduct).then((resule) => {
//   DataProduct.value = resule;
// });
</script>
