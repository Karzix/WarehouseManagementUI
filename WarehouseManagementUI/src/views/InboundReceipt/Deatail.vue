<template>
    <el-table :data="tableData.data?.data" border style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="productName" label="Tên sản phẩm" width="180" />
      <el-table-column prop="supplierName" label="Nhà cung cấp" />
      <el-table-column prop="quantity" label="Số lượng" />
    </el-table>
  </template>
  <script setup lang="ts">
  import { AppResponse } from "@/Models/AppResponse";
  import type { ImportProductDtos } from "@/Models/Dtos/ImportProductDtos";
  import type { Filter } from "@/Models/Request/Filter";
  import type { SearchRequest } from "@/Models/Request/ShearchRequest";
  import { reactive, ref } from "vue";
  import { useRoute } from "vue-router";
  import { SearchImportProduct } from "@/Service/ImportProduct/Search";
  import type { SearchResponse } from "@/Models/Request/SearchResponse";
  
  const tableData = ref<AppResponse<SearchResponse<ImportProductDtos>>>({
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
    PageSize: 10000,
  });
  const FetchData = async () => {
    var InboundReceiptId = useRoute().params.Id.toString();
    UpdateFilter("InboundReceiptId", InboundReceiptId);
    SearchImportProduct(searchRequest).then((resule) => {
      tableData.value = resule;
      console.log(tableData.value.data?.data);
    });
  };
  FetchData();
  function UpdateFilter(FieldName: string, value: string) {
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