<template>
  <Suspense>
    <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Product'" :allowAdd="true" :allowDelete="true" title="User"
            :CustomActions="CustomActions" :allowEdit="true"></BasicAdminFormVue>
  </Suspense>
</template>

<script setup lang="ts">
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
import { ApiActionType, CustomAction, CustomActionDataType } from '@/components/maynghien/adminTable/Models/CustomAction';
const tableColumns: TableColumn[] = [
  {
      key: "name",
      label: "Tên sản phẩm",
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
      key: "description",
      label: "Miêu tả",
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
const CustomActions: CustomAction[] = ([

]);

</script>