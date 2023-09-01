<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="userName" label="Name" width="280px" />
    <el-table-column prop="email" label="State" width="280px" />
    <el-table-column fixed="right" label="Operations" width="100px">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="showDetails(scope.row.id)"
          >Detail</el-button
        >
        <!-- <el-button link type="primary" size="small">Edit</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { User } from "@/Models/IdentityUser";
import axios from "axios";
import { ref,  type Ref } from "vue";
import { axiosInstance } from '@/Service/axiosConfig'
let data = ref([] as User[]);

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
fetchData()
.then((result) => {
  data.value = result;
  console.log(data);
});

function showDetails(userId:string) {
  // Gọi api tìm kiếm người dùng
  axios.get(`https://localhost:7234/api/UserManagement/${userId}`)
    .then((user) => {
      // Chuyển hướng người dùng đến trang thông tin chi tiết
      window.location.href = `/User/${userId}`;
    });
}
</script>
<style></style>
