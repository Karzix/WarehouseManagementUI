<template>
    <el-form label-width="120px" class="Product-Create-From">
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
    
    
    async function submitForm() {
        console.log(Product)
        try{
            await axiosInstance.post('Product', Product)
            window.location.href = '/Product';
        }
        catch(ex){
            alert("Create fail");
        }
    }
</script>
<style>
.Product-Create-From{
    max-width: 500px;
}
</style>