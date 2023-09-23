<template>
<router-link to="/Product/Create">Create prodct</router-link>
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