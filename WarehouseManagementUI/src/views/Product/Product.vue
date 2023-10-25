<template>
  <Suspense>
      <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Product'" :allowAdd="true" :allowDelete="true"
          title="Sản phẩm"
          :allowEdit="true"></BasicAdminFormVue>
  </Suspense>
</template>

<script setup lang="ts">
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
const tableColumns: TableColumn[] = [
  {
      key: "name",
      label: "Tên sản phẩm",
      enableEdit: false,
      enableCreate:true,
      hidden: false,
      width: 500,
      required: true,
      sortable: true,
      showSearch: true,
      inputType: "text",
      dropdownData: null,
  },
  {
      key: "description",
      label: "Miêu tả",
      enableEdit: false,
      enableCreate:true,
      hidden: false,
      width: 500,
      required: true,
      sortable: true,
      showSearch: false,
      inputType: "text",
      dropdownData: null,
  },
]


</script>