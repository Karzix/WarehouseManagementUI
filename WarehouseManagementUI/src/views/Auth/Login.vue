<template>
  <el-form label-width="120px" class="demo-dynamic">
    <el-form-item prop="email" label="Email">
      <el-input v-model="state.userName" type="email"/>
    </el-form-item>
    <el-form-item prop="password" label="Password">
      <el-input v-model="state.password" type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">Submit</el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="primary"><router-link to="/Register" class="link link-auth">Register</router-link></el-button>
    </el-form-item>
  </el-form>
  
</template>
<style>
.demo-dynamic{
  margin-top: calc(40vh - 66px);
}
.link-auth{
  width: 100%;
  border: none;
  color: white;
}
</style>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { LoginViewModel } from '../../Models/LoginViewModel'


import { handleLogin } from "../../Service/LoginService"
import { useToast } from "vue-toastification";

const _toast = useToast();
const state = reactive<LoginViewModel>({
  userName: '',
  password: '',
  email: '1',
  role: '1',
  id : '53a81d6c-0703-4f63-a600-e413f7dc9c69'
});
const submitForm = async () => {
  console.log(state);
  // state.Email = state.UserName
  const loginResult = await handleLogin(state);
  console.log("logresult:" + loginResult);
  if (loginResult.isSuccess)
    window.location.href = '/';
  else
    _toast.success(loginResult.message);
}

</script>
