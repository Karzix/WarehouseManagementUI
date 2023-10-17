<template>
  <el-form label-width="120px" class="Supplier-Create-From">
    <el-form-item label="Name">
      <el-input v-model="SupplierRef.name" type="text" />
    </el-form-item>
    <el-form-item prop="Email" label="Email">
      <el-input v-model="SupplierRef.email" type="email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="Save()">Save</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
//@ts-ignore
import { SupplierDtos } from "@/Models/Dtos/SupplierDtos";
import { useRoute } from "vue-router";
import { getSupplier } from "../../Service/Supplier/GetById";
import { EditSupplier } from '../../Service/Supplier/Edit'
import router from "@/router";


var SupplierRef = ref<SupplierDtos>({
  id: Number(useRoute().params.Id),
  email: "",
  name: "",
});
getSupplier(useRoute().params.Id).then((result) => {
  //@ts-ignore
  SupplierRef.value = result.data;
});
const Save = async() => {
  var Supplier = new SupplierDtos(); 
  Supplier = {
    id: SupplierRef.value.id,
    email: SupplierRef.value.email,
    name: SupplierRef.value.name,
  };
  try{
    const respone = await EditSupplier(Supplier);
    if(!respone.isSuccess){
      console.log(respone.message)
    }
    else{
      //cái này để chuyển trang
      // window.location.href = `/Supplier`;
      router.push("/Supplier");
    }
  }
  catch(ex){
    console.error(ex);
  }
};
</script>
