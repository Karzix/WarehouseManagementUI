<template>
  <router-link to="/Supplier/Create">Create prodct</router-link>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="id" label="id" width="280px" />
    <el-table-column prop="name" label="Name" width="280px" />
    <el-table-column prop="email" label="Email" width="280px" />
    <el-table-column fixed="right" label="Operations" width="100px">
      <template #default="scope">
        <router-link :to="`/Supplier/${scope.row.id}`">
          <el-button link type="primary" size="small">Detail</el-button>
        </router-link>
        <!-- <el-button link type="primary" size="small">Edit</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import {SupplierDtos} from '../../Models/Dtos/SupplierDtos'
import axios from "axios";
import { axiosInstance } from "../../Service/axiosConfig";
var data = ref([] as SupplierDtos[]);

const getData = async () => {
  // var respone = [] as ProductDtos[]
  await axiosInstance.get("Supplier").then((listProduct) => {
    data.value = listProduct.data.data;
    console.log(data.value);
  });
  // return respone;
};
getData();
</script>
