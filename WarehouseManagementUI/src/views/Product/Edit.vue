<template>
    <el-form label-width="120px" class="Product-Create-From">
      <el-form-item label="Name">
        <el-input v-model="ProductRef.name" type="text" />
      </el-form-item>
      <el-form-item prop="Description" label="Description">
        <el-input v-model="ProductRef.description" type="text" />
      </el-form-item>
      <el-form-item prop="Quantity" label="Quantity">
        <el-input v-model="ProductRef.quantity" type="number" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Save()">Submit</el-button>
      </el-form-item>
    </el-form>
  </template>
  <script setup lang="ts">
  import { ref, reactive } from "vue";
  //@ts-ignore
  import { ProductDtos } from "@/Models/Dtos/ProductDtos";
  import { useRoute } from "vue-router";
  import { getProduct } from "../../Service/Product/GetByid";
  import { EditProduct } from '../../Service/Product/Edit'
  import router from "@/router";
  
  
  var ProductRef = ref<ProductDtos>({
id: String(useRoute().params.Id),
name: "",
description: "",
quantity: 0,
email: undefined,
//value: undefined
});
  getProduct(useRoute().params.Id).then((result) => {
    //@ts-ignore
    ProductRef.value = result.data;
  });
  const Save = async() => {
    var Product = new ProductDtos(); 
    Product = {
      id: ProductRef.value.id,
      name: ProductRef.value.name,
      description: ProductRef.value.description,
      quantity: ProductRef.value.quantity,
    };
    try{
      const respone = await EditProduct(Product);
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

