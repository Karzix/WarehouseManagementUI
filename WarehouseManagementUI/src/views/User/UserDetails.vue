<template>
<h1>User details</h1>
<p>User Name: {{ user.userName }}</p>
<p>Email: {{ user.email }}</p>
<p>Id: {{ user.id }}</p>
<p>emailConfirmed: {{ user.emailConfirmed }}</p>
</template>
<script setup lang="ts">
import type { AppResponse } from '@/Models/AppResponse';
import { User } from '@/Models/IdentityUser';
import router from '@/router';
import axios from 'axios';
import { fa } from 'element-plus/lib/locale/index.js';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';


let user = ref<User>({
      id : "",
      userName: "",
      normalizedUserName: "",
      email: "",
      normalizedEmail: "",
      emailConfirmed: true,
      passwordHash: "",
      securityStamp: "",
      concurrencyStamp: "",
      phoneNumber: "",
      phoneNumberConfirmed: false,
      twoFactorEnabled: false,
      lockoutEnd: "",
      lockoutEnabled: false,
      accessFailedCount: ""
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