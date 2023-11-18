<template>
  <el-row>
    Tên: {{ supplier.name }}
    Email: {{ supplier.email }}
  </el-row>
  <router-link :to="`Edit/${useRoute().params.Id}/AddProduct`"><el-button type="primary">Thêm sản phẩm</el-button></router-link>
  <router-link :to="`Edit/${useRoute().params.Id}/CreateNewProduct`"><el-button type="primary">Tạo một sản phẩm mới</el-button></router-link>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="id" label="id" width="280px" />
    <el-table-column prop="productName" label="product Name" width="280px" />
    <el-table-column fixed="right" label="" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click=""
            >Xoá</el-button
          >
        </template>
      </el-table-column>
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
import { getSupplier } from "../../Service/Supplier/GetById";

let Search: SearchRequest = reactive({
  Filters: [] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 100,
});
let supplier = ref<SupplierDtos>({
  id: null,
  name: "",
  email: "",
});
let data = ref([] as ProductDtos[]);

getSupplier(useRoute().params.Id).then((result) => {
  //@ts-ignore
  // thật ra là nó chạy đúng r nhưng nó hiện warning nhìn ngứa mắt quá
  supplier.value = result.data;
});

//cái này dùng để tìm sản phẩm mà cái thằng ncc nó cung cấp
async function search() {
  Search.Filters = [];

  const filter: Filter = {
    FieldName: "SupplierId",
    Value: String(useRoute().params.Id),
    Operation: "search",
  };
  Search.Filters?.push(filter);
  await axiosInstance
    .post("SupplierProduct/search", Search)
    .then((result) => {
      console.log(result.data);
      data.value = result.data.data.data;
    });
}
search();
</script>
