
<template>
  <el-form label-width="120px" class="Supplier-Create-From">
    <el-form-item label="Name">
      <el-input v-model="Supplier.name" type="text" />
    </el-form-item>
    <el-form-item prop="Email" label="Email">
      <el-input v-model="Supplier.email" type="email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import {SupplierDtos} from '../../Models/Dtos/SupplierDtos'
import {CreateSupplier} from '../../Service/Supplier/Create'
import router from "@/router";
var Supplier = reactive<SupplierDtos>({
  id: null,
  email: "",
  name: ""
});

async function submitForm() {
  try{
    var respone =  await CreateSupplier(Supplier);
    if(respone.isSuccess){
      router.push('/Supplier')
    }
    else{
      console.log(respone.message)
    }
  }
  catch(ex){
    console.error(ex);
  }
}
</script>
<style>
.Supplier-Create-From {
  max-width: 500px;
}
</style>
