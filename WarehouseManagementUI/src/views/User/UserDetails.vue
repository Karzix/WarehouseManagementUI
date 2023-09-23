<template>
<h1>User details</h1>
<p>User Name: {{ user.userName }}</p>
<p>Email: {{ user.email }}</p>
<p>Role: {{ user.role }}</p>
<p>Password: {{ user.password }}</p>
</template>
<script setup lang="ts">
import type { LoginViewModel } from '@/Models/LoginViewModel';
import axios from 'axios';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { axiosInstance } from "../../Service/axiosConfig";


let user = ref<LoginViewModel>({
      userName: "",
      password: "",
      email: "",
      role: "",
      id: "53a81d6c-0703-4f63-a600-e413f7dc9c69"
  });

async function getUser(userId: any) {

      await axiosInstance.get(`/UserManagement/${userId}`)
        .then((User) => {
          // Lưu dữ liệu của người dùng vào biến cục bộ
          user.value = User.data.data;
          console.log(user.value)
        });
}
getUser(useRoute().params.Id)

</script>