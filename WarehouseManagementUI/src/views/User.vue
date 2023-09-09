<template>
 <table>
    <tr v-for="i in data2">
        <td>
            {{ i.userName }}
        </td>
        <td>
            {{ i.Email }}
        </td>
    </tr>
 </table> 
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {GetAllUser} from '../Service/GetAllUser'
var data2 = ref([])
GetAllUser()
.then((result) => {
  data2.value = result;
  console.log(data2);
});
</script>

<style>
  table {
  border: 1px solid black;
  width: 100%;
  border-collapse: collapse;
}

 td {
  text-align: center;
  vertical-align: middle;
}

td {
  background-color: #ffffff;
  color: #000000;
}
</style>