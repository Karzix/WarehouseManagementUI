<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="side-bar">
        <!-- <router-link to="/" class="link">Home</router-link>
          <router-link to="/Login" class="link">Login</router-link>
          <router-link to="/User" class="link">User</router-link> -->
        <el-row class="tac">
          <el-col :span="30">
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <router-link to="/" class="layout1-link">
                <el-menu-item index="1">
                  <el-icon>
                    <House />
                  </el-icon>
                  Trang chủ
                </el-menu-item>
              </router-link>
              <router-link to="/Supplier" class="layout1-link">
                <el-menu-item index="2">
                  <el-icon>
                    <Shop />
                  </el-icon>
                  <span>Nhà cung cấp</span>
                </el-menu-item>
              </router-link>
              <router-link to="/Product" class="layout1-link">
                <el-menu-item index="3">
                  <el-icon>
                    <Goods />
                  </el-icon>
                  <span>Sản phẩm</span>
                </el-menu-item>
              </router-link>
              <router-link to="/User" class="layout1-link">
                <el-menu-item index="4">
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>Người dùng</span>
                </el-menu-item>
              </router-link>
              <router-link to="/InboundReceipt" class="layout1-link">
                <el-menu-item index="5">
                  <el-icon>
                    <Back />
                  </el-icon>
                  <span>Nhập kho</span>
                </el-menu-item>
              </router-link>
              <router-link to="/OutboundReceipt" class="layout1-link">
                <el-menu-item index="6">
                  <el-icon>
                    <Right />
                  </el-icon>
                  <span>Xuất kho</span>
                </el-menu-item>
              </router-link>
              <router-link to="/Warehouse" class="layout1-link">
                <el-menu-item index="7">
                  <el-icon>
                    <House />
                  </el-icon>
                  <span>Kho</span>
                </el-menu-item>
              </router-link>
              <el-menu-item index="8" @click="deleteCookie()">
                  <el-icon>
                    <Close />
                  </el-icon>
                  <span>{{decodedToken.UserName}}</span>
                </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container style="background-color: rgb(15, 15, 66);" class="container2">
        <el-header>
          <h4 style="text-align: center; width: 100%;">Quản lý kho hàng</h4>
        </el-header>
        <el-main class="el-main-view container flex-column justify-content-around">
          <router-view></router-view>
        </el-main>
        <el-footer>@Copyright MyDuyen 2023</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {
  Document,
  Shop,
  Setting,
  User,
  House,
  Goods,
  Back,
  Right,
  Close,
} from "@element-plus/icons-vue";
import { decode } from "jsonwebtoken";
import Cookies from "js-cookie";
import { ref } from "vue";
import router from "@/router";

const decodedToken = ref();

function getCode(){
    var token = Cookies.get('accessToken')?.toString();
    decodedToken.value = decode(token ?? '');
    console.log(decodedToken.value);
}
getCode();

function deleteCookie() {
    // Lấy giá trị của tất cả các cookie
    const key = 'accessToken';
    var cookies = document.cookie.split(';');

    // Duyệt qua từng cookie để tìm và xóa cookie với key tương ứng
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(key + '=') === 0) {
            // Tìm thấy cookie, xóa nó bằng cách đặt hết hạn của nó về quá khứ
            var expirationDate = new Date(0);
            document.cookie = key + '=; expires=' + expirationDate.toUTCString() + '; path=/';
            break;
        }
    }
    router.push("/login");
}
</script>
<style scoped>
h4
{
  color: aliceblue;
  font-family: Segoe UI Black ;
  font-size: 50px;
  font-weight: 50px;
 
}
.el-main
{
  background-image: url('https://img.freepik.com/free-vector/gradient-connection-background_23-2150490691.jpg?w=1060&t=st=1701350098~exp=1701350698~hmac=aa87d72815acfadbfd17da1df9bd972e615fa9f0f9afffe7b890d3e908b9bca4');
}
.el-footer {
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: large;
  color: aliceblue;
}
.el-header {
  display: flex;
  font-size: large;
  justify-content: start;
  align-items: center;
}
.layout1-link span {
  font-size: 14px;
}
.layout1-link span:hover {
  transform: scale(1.08);
}
.layout1-link:hover {
  text-decoration: none;
  /* text-transform: capitalize; */
  /* width: 100%; */
  /* color: blue; */
  /* font-size: 18px; */
}
.layout1-li {
  padding: 0 !important;
  text-align: center;
}
.el-sub-menu__title {
  font-size: 25px !important;
}
.Home {
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 25px !important;
}
.el-row {
  display: block !important;
}
.side-bar{
  width: 230px;
}
.container2{
  background-image: url("../../assets/z4880236201107_475a67997f8869951ed3b062f70149f2.jpg");
}
</style>
