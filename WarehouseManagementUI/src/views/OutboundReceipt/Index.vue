<template>
    <div class="Date">
      <el-select
        v-model="filterBy"
        clearable
        placeholder="Chọn"
        style="width: 90px"
      >
        <el-option
          v-for="item in filters"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        />
      </el-select>
      <div class="block" v-if="filterBy === 'Day'">
        <el-date-picker
          v-model="Day.value"
          type="date"
          placeholder="Pick a date"
          :default-value="new Date(2023, 1, 1)"
        />
      </div>
      <div class="block" v-else-if="filterBy === 'Month'">
        <el-date-picker
          v-model="Month.value"
          type="month"
          placeholder="Pick a month"
        />
      </div>
      <div class="block" v-else-if="filterBy === 'Year'">
        <el-date-picker
          v-model="Year.value"
          type="year"
          placeholder="Pick a year"
        />
      </div>
      <el-button
        :icon="Search"
        v-if="filterBy"
        style="margin: 0"
        @click="SeachDate()"
        >Search</el-button
      >
      <el-button @click="handleCreate()" type="primary">Thêm</el-button>
      <el-button :icon="Download" @click="DownloadExcel()">In</el-button>
    </div>
    <el-table :data="tableData.data?.data" style="width: 100%">
      <el-table-column prop="to" label="Nơi đến" width="180" />
      <el-table-column prop="warehouseName" label="Kho" width="180" />
      <el-table-column prop="createdOn" label="Ngày tạo">
        <template #default="{ row }">
          {{
            new Date(row.createdOn).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="120">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="Deatail(scope.row.id)"
            >Chi tiết</el-button
          >
          <el-button
          type="danger"
          size="small"
          style="width: 63px"
          @click="Delete(scope.row.id)"
          >Xóa</el-button
        >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="totalItem"
        :page-size="10"
        @current-change="handlePageChange"
        :current-page="searchRequest.PageIndex"
        class="mt-4"
      />
    </div>
  </template>
  <script setup lang="ts">
  import { reactive, ref } from "vue";
  import { ImportProductDtos } from "../../Models/Dtos/ImportProductDtos";
  import { InboundReceiptDtos } from "../../Models/Dtos/InboundReceiptDtos";
  //@ts-ignore
  import { AppResponse } from "@/Models/AppResponse";
  import type { Filter } from "@/Models/Request/Filter";
  import type { SearchResponse } from "@/Models/Request/SearchResponse";
  import { SearchInboundReceipt } from "../../Service/InboundReceipt/Search";
  import type { SearchRequest } from "@/Models/Request/ShearchRequest";
  import { Search, Download } from "@element-plus/icons-vue";
  import { axiosInstance } from "@/Service/axiosConfig";
  import router from "@/router";
  import { useRouter } from "vue-router";
  import type { SearchDTOItem } from "@/components/maynghien/adminTable/Models/SearchDTOItem";
  import { SearchOutboundReceipt } from "@/Service/OutboundReceipt/Search";
  import type { OutboundReceiptDtos } from "@/Models/Dtos/OutboundReceiptDtos";
  const filters = [
    {
      text: "Ngày",
      value: "Day",
    },
    {
      text: "Tháng",
      value: "Month",
    },
    {
      text: "Năm",
      value: "Year",
    },
  ];
  const filterBy = ref("");
  const Day = reactive({ value: "" });
  const Month = reactive({ value: "" });
  const Year = reactive({ value: "" });
  const tableData = ref<AppResponse<SearchResponse<OutboundReceiptDtos>>>({
    isSuccess: false,
    data: {
      data: undefined,
      currentPage: undefined,
      totalPages: undefined,
      rowsPerPage: undefined,
      totalRows: undefined,
    },
    message: "",
  });
  let searchRequest = reactive<SearchRequest>({
    Filters: [
      {
        FieldName: "IsDelete",
        Value: "",
        Operation: undefined,
      },
    ] as Filter[],
    SortByInfo: undefined,
    PageIndex: 1,
    PageSize: 10,
  });
  const totalPages = ref(0);
  const totalItem = ref(10);
  SearchOutboundReceipt(searchRequest).then((resule) => {
    tableData.value = resule;
    console.log(tableData.value.data?.data);
    console.log(tableData.value);
    if (resule.data?.totalPages != undefined)
      totalPages.value = resule.data?.totalPages;
    else totalPages.value = 0;
    if (resule.data?.totalRows != undefined) {
      totalItem.value = resule.data?.totalRows;
    } else totalItem.value = 0;
  });
  function SeachDate() {
    var FieldName = filterBy.value;
    var value = "";
    if (filterBy.value === "Day") {
      value = Day.value;
    } else if (filterBy.value === "Month") {
      value = Month.value;
    } else if (filterBy.value === "Year") {
      value = Year.value;
    }
    console.log(value);
    FindFilter(FieldName, value);
    SearchOutboundReceipt(searchRequest).then((resule) => {
      tableData.value = resule;
      console.log(tableData.value.data?.data);
      console.log(tableData.value);
      if (resule.data?.totalPages != undefined)
            totalPages.value = resule.data?.totalPages;
          else
            totalPages.value = 0;
          if (resule.data?.totalRows != undefined) {
            totalItem.value = resule.data?.totalRows;
          }
          else
            totalItem.value = 0;
    });
  }
  
  function FindFilter(FieldName: string, value: string) {
    var j = -1;
    for (var i = 0; i < (searchRequest.Filters ?? []).length; i++) {
      if ((searchRequest.Filters ?? [])[i].FieldName == FieldName) {
        (searchRequest.Filters ?? [])[i].Value = value;
        j = i;
        break;
      }
    }
    if (j == -1) {
      searchRequest.Filters = [
        {
          FieldName: "IsDelete",
          Value: "",
          Operation: undefined,
        },
      ];
      searchRequest.Filters?.push({
        FieldName: FieldName,
        Value: value,
        Operation: undefined,
      });
    }
  }
  function DownloadExcel() {
    var data;
    axiosInstance
      .post("OutboundReceipt/Download", searchRequest, {
        responseType: "blob",
      })
      .then((response) => {
        data = response.data;
        // Chuyển dữ liệu thành một đối tượng Blob
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
  
        // Tải file về máy
        const filename =
          "OutboundReceipt" + new Date().toLocaleDateString("vi-GB") + ".xlsx";
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      });
  }
  function Deatail(Id: any) {
    router.push("/OutboundReceipt/Deatail/" + Id.toString());
  }
  const handlePageChange = async (value: number) => {
    searchRequest.PageIndex = value;
    await SearchOutboundReceipt(searchRequest).then((resule) => {
      tableData.value = resule;
      console.log(tableData.value.data?.data);
      console.log(tableData.value);
      if (resule.data?.totalPages != undefined)
            totalPages.value = resule.data?.totalPages;
          else
            totalPages.value = 0;
          if (resule.data?.totalRows != undefined) {
            totalItem.value = resule.data?.totalRows;
          }
          else
            totalItem.value = 0;
    });
  };
  function handleCreate(){
  router.push("/OutboundReceipt/Create");
}
async function Delete(Id: any) {
  let result: AppResponse<SearchResponse<InboundReceiptDtos>> = {
    isSuccess: false,
    message: "",
    data: {
      data: undefined,
      totalPages: undefined,
      rowsPerPage: undefined,
      totalRows: undefined,
      currentPage: undefined,
    },
  };
  try {
    await axiosInstance
      .delete("OutboundReceipt/" + Id.toString())
      .then((listProduct) => {
        result.data = listProduct.data.data;
        result.isSuccess = listProduct.data.isSuccess;
      });
      if(!result.isSuccess){
        console.log(result.message);
      }
      else{
        alert("Delete success");
      }
  } catch (ex) {
    console.error(ex);
  }
}
  </script>
  <style scoped>
  .Date {
    display: flex;
    gap: 10px;
  }
  .el-button+.el-button {
    margin-left: 0;
}
  </style>