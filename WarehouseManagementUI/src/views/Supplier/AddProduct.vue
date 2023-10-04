<template>
  <el-table :data="Data.data?.data" style="width: 100%">
    <el-table-column prop="id" label="id" width="280px" />
    <el-table-column prop="name" label="Name" width="280px" />
    <el-table-column prop="description" label="Description" width="280px" />
    <el-table-column fixed="right" label="Operations" width="100px">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="addProduct(scope.row.id)"
          >Add</el-button
        >
        <!-- <el-button link type="primary" size="small">Edit</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <div style="display: flex">
    <el-button
      v-if="Number(searchRequest.PageIndex) > 1"
      @click="previousPage"
      >{{ Number(searchRequest.PageIndex) - 1 }}</el-button
    >
    <el-button type="primary">{{ searchRequest.PageIndex }}</el-button>
    <el-button
      v-if="(Data.data?.data?.length ? Data.data?.data?.length:1) % searchRequest.PageSize! == 0 "
      @click="nextPage"
      >{{ Number(searchRequest.PageIndex) + 1 }}</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ProductDtos } from "@/Models/Dtos/ProductDtos";
import { Search } from "../../Service/Product/Search";
import type { SearchRequest } from "@/components/maynghien/BaseModels/SearchRequest";
import type { Filter } from "@/Models/Request/Filter";
import type { AppResponse } from "@/models/AppResponse";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import {
  AddProduct,
  CreateNewProduct,
} from "@/Service/Supplier/AddProductForSupplier";
import { useRoute } from "vue-router";
const { params } = useRoute();
var Data = ref<AppResponse<SearchResponse<ProductDtos>>>({
  isSuccess: false,
  data: {
    data: [] as ProductDtos[],
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
Search(searchRequest).then((resule) => {
  Data.value = resule;
});
const nextPage = () => {
  searchRequest.PageIndex!++;
  Search(searchRequest).then((resule) => {
    Data.value = resule;
  });
};
const previousPage = () => {
  searchRequest.PageIndex!--;
  Search(searchRequest).then((resule) => {
    Data.value = resule;
  });
};

async function addProduct(productId: string) {
  try {
    

    const supplierId = params.Id;
    var result = await AddProduct(productId, String(supplierId));
    console.log(result);
  } catch (ex) {
    console.error(ex);
  }
}
</script>
