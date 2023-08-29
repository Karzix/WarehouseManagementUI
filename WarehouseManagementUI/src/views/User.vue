<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="userName" label="UserName" width="180" />
    <el-table-column prop="email" label="Email" width="180" />
    <el-table-column prop="emailConfirmed" label="EmailConfirmed" />
  </el-table>
</template>
<script setup lang="ts">
import { User } from "@/Models/IdentityUser";
import axios from "axios";
import { ref,  type Ref } from "vue";
let data: any = ref([]);

const fetchData = async (): Promise<User[]> => {
  let data2 = [] as User[];
  try {
    await axios
      .get("https://localhost:7234/api/UserManagement")
      .then((respons) => (data2 = respons.data.data));
    console.log(data2);
  } catch (error) {
    // Handle any errors here
    console.error("Error:", error);
  }
  return data2;
};
fetchData().then((result) => {
  data.value = result;
  console.log(data);
});
</script>
<style></style>
