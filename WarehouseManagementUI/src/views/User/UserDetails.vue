<template>
<h1>User details</h1>
<p>User Name: {{ user.userName }}</p>
<p>Email: {{ user.email }}</p>
<p>Role: {{ user.role }}</p>
<p>Password: {{ user.password }}</p>
</template>
<script setup lang="ts">
import type { AppResponse } from '@/Models/AppResponse';
import { User } from '@/Models/IdentityUser';
import type { LoginViewModel } from '@/Models/LoginViewModel';
import router from '@/router';
import axios from 'axios';
import { fa } from 'element-plus/lib/locale/index.js';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';


let user = ref<LoginViewModel>({
      userName: "",
      password: "",
      email: "",
      role: ""
  });

async function getUser(userId: any) {

      await axios.get(`https://localhost:7234/api/UserManagement/${userId}`)
        .then((User) => {
          // Lưu dữ liệu của người dùng vào biến cục bộ
          user.value = User.data.data;
          console.log(user.value)
        });
}
getUser(useRoute().params.Id)

</script>