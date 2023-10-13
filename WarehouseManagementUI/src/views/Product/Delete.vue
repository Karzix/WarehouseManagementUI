<template>
    <el-form label-width="120px" class="Product-Create-From">
      <el-form-item label="Name">
        <el-input v-model="Product.name" type="text" />
      </el-form-item>
      <el-form-item prop="Description" label="Description">
        <el-input v-model="Product.description" type="text" />
      </el-form-item>
      <el-form-item prop="Quantity" label="Quantity">
        <el-input v-model="Product.quantity" type="number" />
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteProduct()">Delete</el-button>
      </el-form-item>
    </el-form>
  </template>
  <script setup lang="ts">
  import { ref, reactive } from "vue";
  //@ts-ignore
  import { ProductDtos } from "@/Models/Dtos/ProductDtos";
  import { useRoute } from "vue-router";
  import { getProduct } from "../../Service/Product/GetByid";
  import { DeleteProduct } from '../../Service/Product/Delete'
  import router from "@/router";
  
  
  var Product = ref<ProductDtos>({
id: String(useRoute().params.Id),
name: "",
description: "",
quantity: 0,
//value: undefined
});
  getProduct(useRoute().params.Id).then((result: { data: any; }) => {
    //@ts-ignore
    Product.value = result.data;
  });
  const deleteProduct = async() => {
    try{
      const respone = await DeleteProduct(String(Product.value.id));
      if(!respone.isSuccess){
        console.log(respone.message)
      }
      else{
        router.push("/Product");
      }
    }
    catch(ex){
      console.error(ex);
    }
  };
  </script>