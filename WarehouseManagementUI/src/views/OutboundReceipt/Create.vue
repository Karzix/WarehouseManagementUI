<template>
  <div class="General-Information">
    <el-button @click="()=>{AddProduct = true}" type="primary" style="margin: 0" :disabled="!Warehouse"
      >Add Product</el-button
    >
    <div class="m-4 input-Select">
      <p>Kho:</p>
      <el-select
        v-model="Warehouse"
        clearable
        filterable
        :reserve-keyword="false"
        placeholder="Tên kho"
        :remote-method="remoteMethodWarehouse"
        required
      >
        <el-option
          v-for="item in listWarehouseRef"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <el-button
      @click="createOutboundReceipt()"
      type="primary"
      style="margin: 0"
      :disabled="(OutboundReceipt.listExportProductDtos?.length == 0 || To.value == '')"
      >Save</el-button
    >
  </div>
  <el-input
    v-model="To.value"
    autosize
    type="textarea"
    placeholder="Nơi đến"
  />
  <el-table :data="OutboundReceipt.listExportProductDtos" style="width: 100%">
    <el-table-column prop="supplierName" label="Supplier" width="180" />
    <el-table-column prop="productName" label="Warehouse" width="180" />
    <el-table-column prop="quantity" label="Quantity" />
    <el-table-column fixed="right" label="" width="100px">
      <template #default="scope">
        <el-button
          type="primary"
          size="small"
          @click="RemoveExportProduct(scope.$index)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <transition name="Create">
    <div class="Create" v-if="AddProduct == true">
      <button
        @click="
          () => {
            AddProduct = false;
          }
        "
        class="Close"
      >
        X
      </button>
      <el-input
        class="w-50 m-2"
        placeholder="Type something"
        :prefix-icon="Search"
        v-model="Product"
        @input="remoteMethodProduct"
      />
      <el-table :data="listProductRemainmingRef" style="width: 100%">
        <el-table-column prop="productName" label="Tên sản phẩm" width="150px" />
        <el-table-column prop="supplierName" label="Tên nhà cung cấp" width="150px" />
        <el-table-column prop="quantity" label="Số lượng" width="100px" />
        <el-table-column fixed="right" label="" width="100px">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="addExportProduct(scope.row.productId,scope.row.supplierId, Number(QuantityProdcut[scope.$index]))"
              >Add</el-button
            >
            <el-input type="number" v-model="QuantityProdcut[scope.$index]" min="1" :max="scope.row.quantity"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ExportProductDtos } from "@/Models/Dtos/ExportProductDtos";
import { OutboundReceiptDtos } from "@/Models/Dtos/OutboundReceiptDtos";
import type { ProductRemainingDtos } from "@/Models/Dtos/ProductRemainingDtos";
import type { WarehouseDtos } from "@/Models/Dtos/WarehouseDtos";
import type { Filter } from "@/Models/Request/Filter";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import type { SearchRequest } from "@/Models/Request/ShearchRequest";
import { SearchProductRemainming } from "@/Service/ProductRemainming/Search";
import { SearchWarehouse } from "@/Service/Warehouse/Search";
import type { AppResponse } from "@/Models/AppResponse";
import { reactive, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { CreateOutboundReceipt } from "@/Service/OutboundReceipt/Create";
import { UpdateProductRemainming } from "@/Service/ProductRemainming/Update";

const listWarehouseRef = ref<WarehouseDtos[]>([]);
const listProductRemainmingRef = ref<ProductRemainingDtos[]>([]);
let AddProduct =ref(false);
const Product = ref("")
const QuantityProdcut = ref<Number[]>([]);
let GetListModels: SearchRequest = reactive({
  Filters: [
    {
      FieldName: "IsDelete",
      Value: "false",
      Operation: "search",
    },
  ] as Filter[],
  SortByInfo: undefined,
  PageIndex: 1,
  PageSize: 10,
});

let listWarehouse: AppResponse<SearchResponse<WarehouseDtos>> = {
  data: undefined,
  message: "",
  isSuccess: false,
};
let listProductRemainming: AppResponse<SearchResponse<ProductRemainingDtos>> = {
  data: undefined,
  message: "",
  isSuccess: false,
};
const OutboundReceipt = reactive<OutboundReceiptDtos>({
  warehouseId: 0,
  to: "",
  id: undefined,
  warehouseName: "",
  listExportProductDtos: [] as ExportProductDtos[],
});
const To = reactive({value: ""});
const Warehouse = ref<string>("");
const loading = ref(false);
const remoteMethodWarehouse = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      listWarehouseRef.value =
        listWarehouse.data?.data?.filter((item) =>
          item.name?.toLowerCase().includes(query.toLowerCase())
        ) ?? [];
    }, 200);
  } else {
    listWarehouseRef.value = listWarehouse.data?.data ?? [];
  }
};
SearchWarehouse(GetListModels).then((result) => {
  listWarehouse = result;
  listWarehouseRef.value = listWarehouse.data?.data ?? [];
  console.log(listWarehouseRef.value);
  console.log(listWarehouse.data);
});

async function searchProduct() {
  if (Warehouse.value.length == 0) {
  } else {
    const filter: Filter = {
      FieldName: "WarehouseId",
      Value: String(Warehouse.value),
      Operation: "search",
    };
    GetListModels.Filters?.push(filter);
    await SearchProductRemainming(GetListModels).then((resule) => {
      listProductRemainming = resule;
      listProductRemainmingRef.value = listProductRemainming.data?.data ?? [];
      console.log(listProductRemainmingRef.value);
      console.log(listProductRemainming.data);
    });
  }
}
watch(Warehouse, searchProduct);

function RemoveExportProduct(idProduct: number) {
  OutboundReceipt.listExportProductDtos?.splice(idProduct,1);
}
const remoteMethodProduct = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      listProductRemainmingRef.value =
      listProductRemainming.data?.data?.filter((item) =>
          item.productName?.toLowerCase().includes(query.toLowerCase())
        ) ?? [];
    }, 200);
    // QuantityProdcut.value.slice(0,0);
    // listProductRemainmingRef.value.forEach((item)=>{
    //   QuantityProdcut.value.push(1);
    // })
  } else {
    listProductRemainmingRef.value = listProductRemainming.data?.data ?? [];
  }
};
function createOutboundReceipt() {
  OutboundReceipt.to = To.value;
  OutboundReceipt.warehouseId = Number(Warehouse.value);
  console.log(OutboundReceipt);
  CreateOutboundReceipt(OutboundReceipt).then((result) => {
    console.log(result);
  });

  OutboundReceipt.listExportProductDtos?.forEach((item) => {
    const productRemaining: ProductRemainingDtos = {
      id: undefined,
      quantity: -1* (item.quantity ?? 0),
      productId: item.productId ?? 0,
      supplierId: item.supplierId ?? 0,
      productName: item.productName ?? "",
      supplierName: item.supplierName ?? "",
      warehouseId: Number(Warehouse.value),
      warehouseName: "",
    };
    UpdateProductRemainming(productRemaining).then((resule) => {
      console.log(resule.data);
    })
  })
}
function addExportProduct(productId : number,supplierId : number, quantity : number) {
  var exportProduct = new ExportProductDtos();
  exportProduct.productId = productId;
  exportProduct.quantity = quantity;
  exportProduct.supplierId = supplierId;
  exportProduct.supplierName = listProductRemainmingRef.value.filter(
    (x) => x.supplierId == supplierId
  )[0].supplierName;
  exportProduct.productName = listProductRemainmingRef.value.filter(
    (x) => x.productId == productId
  )[0].productName;
  OutboundReceipt.listExportProductDtos?.push(exportProduct);
  AddProduct.value = false;
}
watch(OutboundReceipt, () => {
  listProductRemainmingRef.value =
    listProductRemainming.data?.data?.filter(
      (item) =>
        !OutboundReceipt.listExportProductDtos?.some(
          (exportProduct) => exportProduct.productId === item.productId
        )
    ) ?? [];
    console.log(QuantityProdcut)
    QuantityProdcut.value = [];
    listProductRemainmingRef.value.forEach((item)=>{
      QuantityProdcut.value.push(1);
    })
    console.log(QuantityProdcut)
});
</script>
<style scoped>
.el-select .el-select__tags-text {
  font-size: 20px;
}
.input-Select {
  display: flex;
  align-items: center;
  gap: 10px;
}
.Create {
  display: flex;
  z-index: 10;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  background-color: #efeff3;
  padding: 20px;
  border-radius: 20px;
}
.Create div {
  gap: 15px;
  width: 100%;
}
.Create div > p {
  width: 130px;
}
.Close {
  border: 1px solid #ccc;
  color: #ccc;
  padding: 5px;
}
.el-table__body {
  width: 100% !important;
}
/* hiệu ứng chuyển động */
.Create-enter-active {
  transition: all 0.5s ease-out;
}

.Create-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.Create-enter-from,
.Create-leave-to {
  transform: translateX(30%);
  opacity: 0;
}
.General-Information {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>