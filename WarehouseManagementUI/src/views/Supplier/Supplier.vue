<template>
  <el-table :data="Data.data?.data" style="width: 100%">
    <el-table-column prop="id" label="id" width="280px" />
    <el-table-column prop="name" label="Name" width="280px" />
    <el-table-column prop="email" label="Email" width="280px" />
    <el-table-column fixed="right" label="Operations" width="100px">
      <template #default="scope">
        <router-link :to="`/Supplier/${scope.row.id}`">
          <el-button link type="primary" size="small">Detail</el-button>
        </router-link>
        <router-link :to="`/Supplier/Edit/${scope.row.id}`">
          <el-button link type="primary" size="small">Edit</el-button>
        </router-link>
        <el-button link type="primary" size="small" @click="Delete(scope.row.id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import {SupplierDtos} from '../../Models/Dtos/SupplierDtos'
import{fetchData} from '../../Service/Supplier/GetAllSupplier'
import { AppResponse } from "@/models/AppResponse";
import { SearchRequest } from "@/Models/Request/ShearchRequest";
import { Filter } from "../../Models/Request/Filter";
import { SearchResponse } from "../../Models/Request/SearchResponse";
import { Delete } from "../../Service/Supplier/Delete";
var Data = ref<AppResponse<SearchResponse<SupplierDtos>>>({
  isSuccess:false,
  data : {
    data: undefined,
    currentPage: undefined,
    totalPages: undefined,
    rowsPerPage: undefined,
    totalRows: undefined
  },
  message: ""
});
let Search: SearchRequest = reactive({
  Filters: [{
    FieldName: "IsDelete",
    Value: ""
  }] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 2 ,
})

//vì bản thân fetch Data đang là kiểu Promise nên cần dùng "".then" để trả về kiểu Appresponse
fetchData(Search).then(result =>{
  Data.value = result;
})

</script>
