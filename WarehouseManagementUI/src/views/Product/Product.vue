<template>
  <router-link to="/Product/Create">Create prodct</router-link>
  <el-table :data="Data.data?.data" style="width: 100%">
    <el-table-column prop="id" label="id" width="280px" />
    <el-table-column prop="name" label="Name" width="280px" />
    <el-table-column prop="description" label="Description" width="280px" />
    <el-table-column prop="quantity" label="Quantity" width="280px" />
    <!-- <el-table-column fixed="right" label="Operations" width="100px">
      <template #default="scope">
        <router-link :to='`/User/${scope.row.id}`' >
        <el-button link type="primary" size="small" 
          >Detail</el-button
        >
       </router-link>
        
      </template>
    </el-table-column> -->
  </el-table>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ProductDtos } from "@/Models/Dtos/ProductDtos";
import {SearchProduct} from '../../Service/Product/Search'
import type { Filter } from "@/Models/Request/Filter";
import type { AppResponse } from "@/models/AppResponse";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { SearchRequest } from "@/Models/Request/ShearchRequest";
var Data = ref<AppResponse<SearchResponse<ProductDtos>>>({
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

let searchRequest: SearchRequest = reactive({
  Filters: [{
    FieldName: "IsDelete",
    Value: ""
  }] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 10 ,
})
SearchProduct(searchRequest).then(resule =>{
  Data.value = resule
}
)
</script>
