<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <!-- <router-link to="/" class="link">Home</router-link>
          <router-link to="/Login" class="link">Login</router-link>
          <router-link to="/User" class="link">User</router-link> -->
        <el-scrollbar>
          <el-menu :default-openeds="['1', '1']">
            <el-menu-item index="1-3" class="layout1-li">
              <router-link to="/" class="Home">Home</router-link>
            </el-menu-item>
            <el-sub-menu index="1">
              <template #title>
                <el-icon><message /></el-icon>Product
              </template>
              <el-menu-item index="1-3" class="layout1-li">
                <router-link to="/Product/Create" class="layout1-link"
                  >Create Product</router-link
                >
              </el-menu-item>
              <el-menu-item index="1-3" class="layout1-li">
                <router-link to="/Product" class="layout1-link"
                  >Product Management</router-link
                >
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
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
<style>
.el-aside {
  background-color: #ccc;
}
.el-footer {
  background-color: black;
}
.el-header {
  background-color: aquamarine;
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
.Home{
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 25px !important;
}
</style>
