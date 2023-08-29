<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <router-link to="/" class="link">Home</router-link>
          <router-link to="/Login" class="link">Login</router-link>
          <router-link to="/User" class="link">User</router-link>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </div>
  </template>
<style>
.el-aside{
  background-color: #ccc;
}
.el-footer{
  background-color: black;
}
.el-header{
  background-color: aquamarine;
}
.link{
  display: block;
  text-decoration: none;
  color: black;
  border: 2px solid black;
  text-align: center;
}
</style>  