<template>
    <el-form label-width="120px" class="demo-dynamic">
      <el-form-item prop="email" label="Email">
        <el-input v-model="Register.UserName" type="email"/>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input v-model="Register.Password" type="password"/>
      </el-form-item>
      <el-form-item prop="passwordConfirm" label="Password Confirm">
        <el-input v-model="Register.passwordConfirm" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Submit</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"><router-link to="/Login" class="link link-auth">Login</router-link></el-button>
      </el-form-item>
    </el-form>
    
  </template>
<style>
.demo-dynamic{
  margin-top: calc(40vh - 66px);
}
.link-auth{
  border: none;
  color: white;
}
</style>
  <script lang="ts" setup>
  import { reactive, ref } from 'vue';
  
  import { LoginViewModel } from '../../Models/LoginViewModel'
  import { register } from "../../Service/RegisterService"

  const Register = ref({
    UserName: '',
    Password: '',
    passwordConfirm: ''
  })
  const state = reactive<LoginViewModel>({
      userName: "",
      password: "",
      email: "",
      role: "",
      id : ""
  });
  const submitForm = async () => {

    if(Register.value.Password === Register.value.passwordConfirm && Register.value.UserName != null){
        state.userName = Register.value.UserName;
        state.email = Register.value.UserName;
        state.password = Register.value.Password;
        const RegisterResult = await register(state);
        console.log("logresult:" + RegisterResult);
    }
  }
  </script>
  