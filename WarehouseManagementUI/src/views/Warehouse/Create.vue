<template>
  <el-form label-width="120px" class="Product-Create-From">
    <el-form-item label="Name">
      <el-input v-model="Warehouse.name" type="text" />
    </el-form-item>
    <el-form-item prop="Email" label="Email">
      <el-input v-model="Warehouse.email" type="text" />
    </el-form-item>
    <el-form-item label="Address">
      <el-input v-model="Warehouse.address" type="text" />
    </el-form-item>
    <el-form-item label="Managent">
      <el-input v-model="Warehouse.managent" type="text" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { WarehouseDtos } from "@/Models/Dtos/WarehouseDtos";
import { CreateWarehouse } from "../../Service/Warehouse/Create";
var Warehouse = reactive<WarehouseDtos>({
  id: undefined,
  name: "",
  email: "",
  address: "",
  managent: "",
});

async function submitForm() {
  var result = CreateWarehouse(Warehouse);
}
</script>
<style>
.Product-Create-From {
  max-width: 500px;
}
</style>
