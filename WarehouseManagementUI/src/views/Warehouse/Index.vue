<template>
  <Suspense>
      <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Warehouse'" :allowAdd="true" :allowDelete="true"
          title="Kho"
          :CustomActions="CustomActions"
          :allowEdit="true"
          @onCustomAction="ChangePage"
          ></BasicAdminFormVue>
  </Suspense>
</template>

<script setup lang="ts">
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
import router from '@/router';
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
const CustomActions: CustomAction[] = ([
    {
        ActionName: "Deatail",
        ActionLabel: "Chi tiết",
        ApiActiontype:ApiActionType.PUT,
        IsRowAction: true,
        DataType: CustomActionDataType.RowId,
    }
]);
function ChangePage(item: CustomActionResponse){
    if(item.Action.ActionName == "Deatail")
    router.push("Warehouse/Deatail/" + item.Data.id);
}
</script>