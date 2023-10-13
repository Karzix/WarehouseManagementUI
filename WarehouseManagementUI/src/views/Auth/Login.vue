<template>
  <el-form label-width="120px" class="demo-dynamic">
    <el-form-item prop="TenDangNhap" label="">
      <el-icon class="iconuser"><UserFilled /></el-icon>
      <el-input v-model="state.userName" type="text" class="login-input" placeholder ="Tên Đăng Nhập"/>
    </el-form-item>
    <el-form-item prop="password" label="">
      <el-icon class="iconKey"><Key /></el-icon>
      <el-input v-model="state.password" type="password" class="login-input" placeholder ="Mật Khẩu"/>
    </el-form-item>
    <div>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">Đăng Nhập</el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="primary"><router-link to="/Register" class="link link-auth">Đăng Ký</router-link></el-button>
    </el-form-item>
    </div>
  </el-form>
</template>
<style>
.demo-dynamic{
  margin-top: calc(40vh - 66px);
  width: 600px;
  margin: 0 auto;
  border: 1px solid rgb(232, 222, 222);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  padding-top: 50px;
  padding-right: 50px;
 
}
.el-form-item {
  margin-bottom: 10px;
}

.el-input {
  width: 100%;
}

.el-button {
  margin-top: 10px;
}

.link-auth {
  width: 100%;
  border: none;
  color: white;
}

.headline {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
}

.subheadline {
  text-align: center;
  font-size: 16px;
}
.link-auth{
  width: 100%;
  border: none;
  color: white;
}
.iconuser
{
  display: block;
    margin-bottom: -33px;
    z-index: 1;
    font-size: 25px !important;

}
.iconKey{
  display: block;
    margin-bottom: -33px;
    z-index: 1;
    font-size: 25px !important;

}
.login-input input{
  padding-left: 20px;
}

</style>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {
    User,
    Key,
    UserFilled
} from '@element-plus/icons-vue';
import { LoginViewModel } from '../../Models/LoginViewModel'


import { handleLogin } from "../../Service/LoginService"
import { useToast } from "vue-toastification";

const _toast = useToast();
const state = reactive<LoginViewModel>({
  userName: '',
  password: '',
  email: '1',
  role: '1',
  id : undefined
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
