<template>
  <el-form label-width="120px" class="demo-dynamic">
    <el-form-item prop="email" label="Email">
      <el-input v-model="user.email" />
    </el-form-item>
    <el-form-item prop="password" label="Password">
      <el-input v-model="user.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const user = ref({
  password: "",
  email: "",
});

const submitForm = () => {
  alert(
    "Email: " + user.value.email + "\n" + "Password: " + user.value.password
  );
};
</script>
