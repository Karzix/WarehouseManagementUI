<template>
<el-table :data="data" style="width: 100%">
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
<el-form label-width="120px" class="demo-dynamic">
      <el-form-item  label="Name">
        <el-input v-model="Product.name" type="text"/>
      </el-form-item>
      <el-form-item prop="Description" label="Description">
        <el-input v-model="Product.description" type="text"/>
      </el-form-item>
      <el-form-item prop="Quantity" label="Quantity">
        <el-input v-model="Product.quantity" type="number"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Submit</el-button>
      </el-form-item>
      
    </el-form>
    
</template>
<script setup lang="ts">
import {ref, reactive} from 'vue'
import { ProductDtos } from '@/Models/Dtos/ProductDtos';
import axios from 'axios';
import { axiosInstance } from "../../Service/axiosConfig";
var data = ref([] as ProductDtos[])
var Product = reactive<ProductDtos>({
    id: '',
    name: '',
    quantity: 0,
    description: ''
})
const getData =async () => {
    // var respone = [] as ProductDtos[]
    await axiosInstance.get('Product')
    .then( listProduct =>{
      data.value = listProduct.data.data
    console.log(data.value);
    
    }
    )
    // return respone;
}
getData();


async function submitForm() {
    console.log(Product)
    await axiosInstance.post('Product', Product)
    getData();
    
}
</script>