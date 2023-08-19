<template>
  <form>
    <div class="from-item">
    <label for="email">Email</label>
    <input type="text" id="email">
    </div>
    <div  class="from-item">
    <label for="password">Password</label>
    <input type="text" name="" id="password">
    </div>
    <input type="submit" name="" id="submitFrom" value="Login" @click="submitForm()">
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const email = ref('cc')

function submitForm() {
    alert("có sài được đâu mà bấm")
}
</script>
<style>

</style>