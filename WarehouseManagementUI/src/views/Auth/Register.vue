<template>
  <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
      <div class="row d-flex">
        <div class="col-lg-6">
          <div class="card1 pb-5">
            <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
              <img
                src="https://img.freepik.com/premium-vector/vector-illustration-register-now-speech-bubble-label_180786-180.jpg"
                class="image" />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card2 card border-0 px-4 py-5">

            <div class="row px-5">
              <label class="p-0 mb-2">
                <h6 class="text-sm">Email</h6>
              </label>
              <input class="mb-4" type="text" name="email" placeholder="Enter a valid user name"
                v-model="Register.UserName" @keydown.enter="submitForm" />
            </div>
            <div class="row px-5">
              <label class="p-0 mb-2">
                <h6 class="text-sm">Password</h6>
              </label>
              <input class="mb-4" type="password" name="password" placeholder="Enter password" v-model="Register.Password"
                @keydown.enter="submitForm" />
            </div>
            <div class="row px-5">
              <label class="p-0 mb-2">
                <h6 class="text-sm">Confirm Password</h6>
              </label>
              <input class="mb-4" type="password" name="password" placeholder="Enter confirm password"
                v-model="Register.passwordConfirm" @keydown.enter="submitForm" />
            </div>
            <div class="row mb-3 px-5 d-flex justify-content-center">
              <button type="submit" class="btn btn-blue text-center" @click="submitForm">
                Register
              </button>
            </div>
            <div class="row mb-4 px-5 d-flex justify-content-center">
              <small class="fw-bold p-0">Already had account?
                <a class="text-danger">
                  <router-link to="/login">Login</router-link>
                </a></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
x body {
  color: #000;
  overflow-x: hidden;
  height: 100%;
  background-color: #b0bec5;
  background-repeat: no-repeat;
}

.card0 {
  box-shadow: 0px 4px 8px 0px #757575;
  border-radius: 0px;
}

.card2 {
  margin: 0px 40px;
}

.logo {
  width: 200px;
  height: 100px;
  margin-top: 20px;
  margin-left: 35px;
}

.image {
  width: 360px;
  height: 280px;
}

.border-line {
  border-right: 1px solid #eeeeee;
}

.facebook {
  background-color: #3b5998;
  color: #fff;
  font-size: 18px;
  padding-top: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.google {
  background-color: orange;
  color: #fff;
  font-size: 18px;
  padding-top: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.twitter {
  background-color: #1da1f2;
  color: #fff;
  font-size: 18px;
  padding-top: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.linkedin {
  background-color: #2867b2;
  color: #fff;
  font-size: 18px;
  padding-top: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.line {
  height: 1px;
  width: 45%;
  background-color: #e0e0e0;
  margin-top: 10px;
}

.or {
  width: 10%;
  font-weight: bold;
}

.text-sm {
  font-size: 14px !important;
}

::placeholder {
  color: #bdbdbd;
  opacity: 1;
  font-weight: 300;
}

:-ms-input-placeholder {
  color: #bdbdbd;
  font-weight: 300;
}

::-ms-input-placeholder {
  color: #bdbdbd;
  font-weight: 300;
}

input,
textarea {
  padding: 10px 12px 10px 12px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 5px;
  margin-top: 2px;
  width: 100%;
  box-sizing: border-box;
  color: #2c3e50;
  font-size: 14px;
  letter-spacing: 1px;
}

input:focus,
textarea:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #304ffe;
  outline-width: 0;
}

button:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  outline-width: 0;
}

a {
  color: inherit;
  cursor: pointer;
}

.btn-blue {
  background-color: #1a237e;
  width: 150px;
  color: #fff;
  border-radius: 2px;
}

.btn-blue:hover {
  background-color: #000;
  cursor: pointer;
}

.bg-blue {
  color: #fff;
  background-color: #1a237e;
}

.facebook-login {
  box-sizing: border-box;
}

.facebook-login * {
  box-sizing: inherit;
}

.facebook-login button {
  font-size: 14px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  color: #3c4043;
  position: relative;
  line-height: 34px;
  min-width: 200px;
  padding: 0 10px;
}

.facebook-login i {
  padding: 12px 8px 12px 2px;
}

.facebook-login img {
  position: absolute;
  top: 3px;
  left: 10px;
  width: 30px;
}

@keyframes facebook-login-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 991px) {
  .logo {
    margin-left: 0px;
  }

  .image {
    width: 300px;
    height: 220px;
  }

  .border-line {
    border-right: none;
  }

  .card2 {
    border-top: 1px solid #eeeeee !important;
    margin: 0px 15px;
  }
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
  id: ""
});
const submitForm = async () => {

  if (Register.value.Password === Register.value.passwordConfirm && Register.value.UserName != null) {
    state.userName = Register.value.UserName;
    state.email = Register.value.UserName;
    state.password = Register.value.Password;
    const RegisterResult = await register(state);
    console.log("logresult:" + RegisterResult);
  }
}
</script>
  