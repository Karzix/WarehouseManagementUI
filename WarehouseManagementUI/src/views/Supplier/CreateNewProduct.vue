<template>
<el-form label-width="120px" class="Product-Create-From">
    <el-form-item label="Name">
      <el-input v-model="Product.name" type="text" />
    </el-form-item>
    <el-form-item prop="Description" label="Description">
      <el-input v-model="Product.description" type="text" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import type { ProductDtos } from '@/Models/Dtos/ProductDtos';
import { reactive } from 'vue';
import {
  CreateNewProduct,
} from "@/Service/Supplier/AddProductForSupplier";
import { useRoute } from 'vue-router';

const { params } = useRoute();

var Product = reactive<ProductDtos>({
  id: undefined,
  name: "",
  quantity: 0,
  description: "",
});
async function submitForm() {

    CreateNewProduct(Product, String(params.Id));
}
</script>