<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <!-- <router-link to="/" class="link">Home</router-link>
          <router-link to="/Login" class="link">Login</router-link>
          <router-link to="/User" class="link">User</router-link> -->
        <el-row class="tac">
          <el-col :span="30">
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <router-link to="/" class="layout1-link" >
                <el-menu-item index="1">
                  <el-icon><House /></el-icon>
                  Home
                </el-menu-item>
              </router-link>
              <router-link to="/Supplier" class="layout1-link">
                <el-menu-item index="2">
                  <el-icon><Shop /></el-icon>
                  <span>Supplier</span>
                </el-menu-item>
              </router-link>
              <router-link to="/Product" class="layout1-link">
                <el-menu-item index="3">
                  <el-icon><Goods /></el-icon>
                  <span>Product</span>
                </el-menu-item>
              </router-link>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <h1>Warehouse management</h1>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
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
} from "@element-plus/icons-vue";
</script>
<style>
.el-footer {
  background-color: rgb(41, 22, 184);
}
.el-header {
  background-color: rgb(41, 22, 184);
  color: aliceblue;
}
.layout1-link {
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 18px;
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
