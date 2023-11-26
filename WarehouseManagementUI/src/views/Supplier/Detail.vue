<template>
  <el-row>
    Tên: {{ supplier.name }}
    Email: {{ supplier.email }}
  </el-row>
  <router-link :to="`Edit/${useRoute().params.Id}/AddProduct`"><el-button type="primary">Thêm sản phẩm</el-button></router-link>
  <router-link :to="`Edit/${useRoute().params.Id}/CreateNewProduct`"><el-button type="primary">Tạo một sản phẩm mới</el-button></router-link>
  <el-table :data="tableData.data?.data" style="width: 100%">
    <el-table-column prop="productId" label="id sản phẩm" width="280px" />
    <el-table-column prop="productName" label="Tên sản phẩm" width="280px" />
    <el-table-column fixed="right" label="" width="120">
        <template #default="scope">
          <el-button
          type="danger"
          size="small"
          style="width: 63px"
          @click="Delete(scope.row.id)"
          >Xóa</el-button
        >
        </template>
      </el-table-column>
  </el-table>
  <div style="display: flex">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="totalItem"
        :page-size="10"
        @current-change="handlePageChange"
        :current-page="Search.PageIndex"
        class="mt-4"
      />
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { axiosInstance } from "../../Service/axiosConfig";
import { ProductDtos } from "@/Models/Dtos/ProductDtos";
import { SearchRequest } from "@/Models/Request/ShearchRequest";
import type { Filter } from "@/Models/Request/Filter";
import { SupplierDtos } from "@/Models/Dtos/SupplierDtos";
import { getSupplier } from "../../Service/Supplier/GetById";
import type { AppResponse } from "@/Models/AppResponse";
import type { InboundReceiptDtos } from "@/Models/Dtos/InboundReceiptDtos";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import { SearchSupplierProduct } from "@/Service/SupplierProduct/Search";

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
const tableData = ref<AppResponse<SearchResponse<ProductDtos>>>({
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
  const totalPages = ref(0);
  const totalItem = ref(10);
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
      tableData.value = result.data
    });
}
search();

async function Delete(Id: any) {
  let result: AppResponse<SearchResponse<InboundReceiptDtos>> = {
    isSuccess: false,
    message: "",
    data: {
      data: undefined,
      totalPages: undefined,
      rowsPerPage: undefined,
      totalRows: undefined,
      currentPage: undefined,
    },
  };
  try {
    await axiosInstance
      .delete("SupplierProduct/" + Id.toString())
      .then((listProduct) => {
        result.data = listProduct.data.data;
        result.isSuccess = listProduct.data.isSuccess;
      });
      if(!result.isSuccess){
        console.log(result.message);
      }
      else{
        window.location.reload();
      }
  } catch (ex) {
    console.error(ex);
  }
}
const handlePageChange = async (value: number) => {
  Search.PageIndex = value;
    await SearchSupplierProduct(Search).then((resule) => {
      tableData.value = resule;
      console.log(tableData.value.data?.data);
      console.log(tableData.value);
      if (resule.data?.totalPages != undefined)
            totalPages.value = resule.data?.totalPages;
          else
            totalPages.value = 0;
          if (resule.data?.totalRows != undefined) {
            totalItem.value = resule.data?.totalRows;
          }
          else
            totalItem.value = 0;
    });
  };
</script>
