<template>
  <el-form label-width="120px" class="Supplier-Create-From">
    <el-form-item label="Name">
      <el-input v-model="WarehouseRef.name" type="text" />
    </el-form-item>
    <el-form-item prop="Email" label="Email">
      <el-input v-model="WarehouseRef.email" type="email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="Save()">Save</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { WarehouseDtos } from "@/Models/Dtos/WarehouseDtos";
import { useRoute } from "vue-router";
//@ts-ignore
import { getWarehouse } from "../../Service/Warehouse/GetById";
import { EditWarehouse } from "../../Service/Warehouse/Edit";
import router from "@/router";

var WarehouseRef = ref<WarehouseDtos>({
  id: Number(useRoute().params.Id),
  email: "",
  name: "",
  address: "",
  managent: "",
});
getWarehouse(useRoute().params.Id).then((result) => {
  //@ts-ignore
  SupplierRef.value = result.data;
});
const Save = async () => {
  var Warehouse = new WarehouseDtos();
  Warehouse = {
    id: WarehouseRef.value.id,
    email: WarehouseRef.value.email,
    name: WarehouseRef.value.name,
    managent: WarehouseRef.value.managent,
    address: WarehouseRef.value.address,
  };
  try {
    const respone = await EditWarehouse(Warehouse);
    if (!respone.isSuccess) {
      console.log(respone.message);
    } else {
      router.push("/Supplier");
    }
  } catch (ex) {
    console.error(ex);
  }
};
</script>
