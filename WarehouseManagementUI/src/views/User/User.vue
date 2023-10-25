<template>
  <Suspense>
      <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'UserManagement'" :allowAdd="true" :allowDelete="true"
          title="UserManagement"
          :allowEdit="true"></BasicAdminFormVue>
  </Suspense>
</template>

<script setup lang="ts">
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
const tableColumns: TableColumn[] = [
  {
      key: "email",
      label: "Email",
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
      key: "password",
      label: "Mật khẩu",
      enableEdit: false,
      enableCreate:true,
      hidden: true,
      width: 0,
      required: true,
      sortable: false,
      showSearch: false,
      inputType: "text",
      dropdownData: null,
  },
  {
      key: "role",
      label: "Vai trò",
      enableEdit: true,
      enableCreate:true,
      hidden: false,
      width: 300,
      required: true,
      sortable: true,
      showSearch: false,
      inputType: "dropdown",
      dropdownData: {
          displayMember: "roleName",
          keyMember: "role",
          data: [
              {
                  role: "superadmin",
                  roleName:"superadmin"
              },
          ]
      },

  },

]


</script>