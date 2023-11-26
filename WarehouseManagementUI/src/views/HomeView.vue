<template>
    <div>
        <img style="width: 100%; height: 77vh;" src="https://www.optiproerp.com/wp-content/uploads/Warehouse-Management-System-1.png">

    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { decode,verify } from "jsonwebtoken";
import Cookies from "js-cookie";
const decodedToken = ref();

function getCode(){
    var token = Cookies.get('accessToken')?.toString();
    decodedToken.value = decode(token ?? '');
    console.log(decodedToken.value);
}
getCode();
</script>
