<template>
  {{ supplier.id }} | {{ supplier.name }} | {{ supplier.email }}
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="id" label="id" width="280px" />
    <el-table-column prop="name" label="Name" width="280px" />
    <el-table-column prop="description" label="Description" width="280px" />
    <el-table-column prop="quantity" label="Quantity" width="280px" />
  </el-table>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { axiosInstance } from "../../Service/axiosConfig";
import type { ProductDtos } from "@/Models/Dtos/ProductDtos";
import { SearchRequest } from "@/Models/Request/ShearchRequest";
import type { Filter } from "@/Models/Request/Filter";
import { SupplierDtos } from "@/Models/Dtos/SupplierDtos";
import { da } from "element-plus/es/locale/index.mjs";

let Search: SearchRequest = reactive({
  Filters: [] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 2 ,
});
let supplier = ref<SupplierDtos>({
  id: "",
  name: "",
  email: ""
})
let data = ref([] as ProductDtos[])

async function getSupplier(Id: any) {
  await axiosInstance.get(`/Supplier/${Id}`,)
  .then(result =>{
    console.log(result)
    supplier.value = result.data.data
  })
}
getSupplier(useRoute().params.Id);

const search =  () => {
  Search.Filters = [];

  const filter: Filter = {
    FieldName: "SupplierId",
    Value: String(useRoute().params.Id),
    Operation: "search",
  };
  Search.Filters?.push(filter);
  var respone =  axiosInstance.post('SupplierProduct/SearchProduct', Search)
  .then(result =>{
    console.log(result.data)
    data.value = result.data.data.data
  })
};
search();
</script>
