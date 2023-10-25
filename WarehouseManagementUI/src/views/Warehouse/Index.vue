<template>
  <Suspense>
      <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Warehouse'" :allowAdd="true" :allowDelete="true"
          title="Kho"
          :allowEdit="true"></BasicAdminFormVue>
  </Suspense>
</template>

<script setup lang="ts">
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
const tableColumns: TableColumn[] = [
  {
      key: "name",
      label: "Tên kho",
      enableEdit: true,
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
      key: "address",
      label: "Địa chỉ",
      enableEdit: true,
      enableCreate:true,
      hidden: false,
      width: 500,
      required: true,
      sortable: true,
      showSearch: false,
      inputType: "text",
      dropdownData: null,
  },
  {
      key: "managent",
      label: "Quản lý",
      enableEdit: true,
      enableCreate:true,
      hidden: false,
      width: 500,
      required: true,
      sortable: true,
      showSearch: false,
      inputType: "text",
      dropdownData: null,
  },
  {
      key: "email",
      label: "Email",
      enableEdit: true,
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