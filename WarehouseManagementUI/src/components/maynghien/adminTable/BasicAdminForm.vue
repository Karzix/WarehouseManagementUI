
<template>
  
  <MnActionPane  :allowAdd="true" :tableColumns="tableColumns"></MnActionPane>
  <MnTable :columns="tableColumns" :datas="datas" />
  
</template>
  
<script setup lang="ts">

// @ts-ignore
import MnTable  from './MnTable.vue'

// @ts-ignore
import MnActionPane from './MnActionPane.vue'

import { ref } from 'vue';
// @ts-ignore
import { TableColumn } from './Models/TableColumn.ts'
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts'

// @ts-ignore
import { handleSearch } from './Service/BasicAdminService.ts'

// @ts-ignore
import { SearchResponse } from '../BaseModels/SearchResponse';
import { SearchRequest } from '../BaseModels/SearchRequest';
import type { AppResponse } from '@/models/AppResponse';

//#region Method

const Search = async () => {
  var searchApiResponse = await handleSearch(searchRequest, props.apiName);
  if (searchApiResponse.isSuccess) {
    let dataresponse: SearchResponse<SearchDTOItem[]> = searchApiResponse.data;
      
    if(dataresponse!=undefined && dataresponse.data!=undefined &&dataresponse.data.length>0){
      datas = dataresponse.data;
     
    }
    else{
      datas= [] ;
    }
  }

}
//#endregion
//#region main

const props = defineProps<{
  tableColumns: TableColumn[];
  apiName: string;
  allowAdd:boolean;
  allowEdit:boolean;
  allowDelete:boolean;
}>();
let datas: SearchDTOItem[] ;
let searchRequest: SearchRequest = {
  PageIndex: 1,
  PageSize: 10,
  filters: undefined,
  SortByInfo: undefined
}
await Search();
//#endregion
</script>