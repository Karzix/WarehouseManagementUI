<template>

</template>
<script setup lang="ts">
import type { SearchRequest } from "@/components/maynghien/BaseModels/SearchRequest";
import type { Filter } from "@/Models/Request/Filter";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import { reactive } from "vue";
import {fetchData} from '../../Service/Supplier/GetAllSupplier';

let GetListModels: SearchRequest = reactive({
  Filters: [{
    FieldName: "IsDelete",
    Value: ""
  }] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 2147483647
})
</script>