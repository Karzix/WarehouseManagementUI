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
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container style="background-color: #deedd1;">
        <el-header>
          <h4>Warehouse Management</h4>
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
} from "@element-plus/icons-vue";
</script>
<style>
.el-footer {
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: large;
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
</style>
