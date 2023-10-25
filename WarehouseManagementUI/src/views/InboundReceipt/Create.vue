<template>
  <div class="General-Information">
    <el-button
      @click="Add"
      type="primary"
      style="margin: 0"
      :disabled="!(Supplier && Warehouse)"
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
        :disabled="!(inboundReceipt.listImportProductDto?.length == 0)"
      >
        <el-option
          v-for="item in listWarehouseRef"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div class="m-4 input-Select">
      <p>Nhà cung cấp:</p>
      <el-select
        v-model="Supplier"
        clearable
        filterable
        :reserve-keyword="false"
        placeholder="Tên nhà cung cấp"
        :remote-method="remoteMethodSupplier"
        required
        :disabled="!(inboundReceipt.listImportProductDto?.length == 0)"
      >
        <el-option
          v-for="item in listSupplierRef"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <el-button
      @click="createInboundReceipt"
      type="primary"
      style="margin: 0"
      :disabled="(inboundReceipt.listImportProductDto ?? []).length == 0"
      >Save</el-button
    >
  </div>

  <el-table :data="inboundReceipt.listImportProductDto" style="width: 100%">
    <el-table-column prop="supplierName" label="Supplier" width="180" />
    <el-table-column prop="productName" label="Warehouse" width="180" />
    <el-table-column prop="quantity" label="Quantity" />
    <el-table-column fixed="right" label="" width="100px">
      <template #default="scope">
        <el-button
          type="primary"
          size="small"
          @click="RemoveImportProduct(Number(scope.$index))"
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
      <el-table :data="listSupplierProductRef" style="width: 100%">
        <el-table-column prop="productName" label="Name" width="280px" />
        <el-table-column fixed="right" label="" width="100px">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="addImportProduct(scope.row.productId, scope.row.quantity)"
              :disabled="!scope.row.quantity"
              >Add</el-button
            >
            <el-input type="number" v-model="scope.row.quantity" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </transition>
</template>
<script setup lang="ts">
import type { Filter } from "@/Models/Request/Filter";
import type { SearchResponse } from "@/Models/Request/SearchResponse";
import { computed, reactive, ref, watch } from "vue";
import { SearchWarehouse } from "@/Service/Warehouse/Search";
import { SearchSupplier } from "@/Service/Supplier/GetAllSupplier";
import { WarehouseDtos } from "@/Models/Dtos/WarehouseDtos";
import type { SupplierDtos } from "@/Models/Dtos/SupplierDtos";
import type { AppResponse } from "@/models/AppResponse";
import type { InboundReceiptDtos } from "@/Models/Dtos/InboundReceiptDtos";
import { ImportProductDtos } from "@/Models/Dtos/ImportProductDtos";
//@ts-ignore
import { SearchSupplierProduct } from "@/Service/SupplierProduct/Search";
import type { SupplierProductDtos } from "@/Models/Dtos/SupplierProductDtos";
import type { SearchRequest } from "@/Models/Request/ShearchRequest";
import { Search } from "@element-plus/icons-vue/global";
import { CreateInboundReceipt } from "@/Service/InboundReceipt/Create";
import{UpdateProductRemainming} from "@/Service/ProductRemainming/Update"
import type { ProductDtos } from "@/Models/Dtos/ProductDtos";
import type { ProductRemainingDtos } from "@/Models/Dtos/ProductRemainingDtos";

let AddProduct = ref(false);
let EnterQuantity = ref(false);
//chổ này để lấy đưa ra trang web
const listWarehouseRef = ref<WarehouseDtos[]>([]);
const listSupplierRef = ref<SupplierDtos[]>([]);
const listSupplierProductRef = ref<SupplierProductDtos[]>([]);
//chổ này để lưu những gì lấy ra từ DB
let listWarehouse: AppResponse<SearchResponse<WarehouseDtos>> = {
  data: undefined,
  message: "",
  isSuccess: false,
};
let listSupplier: AppResponse<SearchResponse<SupplierDtos>> = {
  data: undefined,
  message: "",
  isSuccess: false,
};
let listSupplierProduct: AppResponse<SearchResponse<SupplierProductDtos>> = {
  data: undefined,
  message: "",
  isSuccess: false,
};
//điều kiện để lấy tất cả các dữ liệu chưa xóa
//không dùng get all vì nó sẽ lấy luôn những thằng đã xóa
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
//chổ này để lưu dữ liệu nhập vào, để add vào list, sau đó add vào DB
const Warehouse = ref<string>("");
const Supplier = ref<string>("");
const Product = ref<string>("");
// const ProductQuantity = ref<number>();
const loading = ref(false);
// cái này để lưu những gì đã nhập vào csdl
const inboundReceipt = reactive<InboundReceiptDtos>({
  supplierId: Number(Supplier.value),
  warehouseId: Number(Warehouse.value),
  id: undefined,
  createOn: undefined,
  supplierName: "",
  warehouseName: "",
  listImportProductDto: [],
});
//cái này để tìm cái tên của kho, nhà cung cấp, sản phẩm
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
const remoteMethodSupplier = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      listSupplierRef.value =
        listSupplier.data?.data?.filter((item) =>
          item.name?.toLowerCase().includes(query.toLowerCase())
        ) ?? [];
    }, 200);
  } else {
    listSupplierRef.value = listSupplier.data?.data ?? [];
  }
};
const remoteMethodProduct = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      listSupplierProductRef.value =
        listSupplierProduct.data?.data?.filter((item) =>
          item.productName?.toLowerCase().includes(query.toLowerCase())
        ) ?? [];
    }, 200);
  } else {
    listSupplierProductRef.value = listSupplierProduct.data?.data ?? [];
  }
};
// watch(Product, ()=> remoteMethodProduct(Product.value));
//nếu product nào có trong danh sách nhập kho rồi thì không thể thêm lần nữa
watch(inboundReceipt, () => {
  listSupplierProductRef.value =
    listSupplierProduct.data?.data?.filter(
      (item) =>
        !inboundReceipt.listImportProductDto?.some(
          (importProduct) => importProduct.productId === item.productId
        )
    ) ?? [];
});
//add import vào listImportProduct
const addImportProduct = (idProduct: number, quantity: number) => {
  var importProduct = new ImportProductDtos();
  importProduct.supplierId = Number(Supplier.value);
  importProduct.supplierName = listSupplierRef.value.filter(
    (x) => x.id == Number(Supplier.value)
  )[0].name;
  importProduct.productId = Number(idProduct);
  importProduct.productName = listSupplierProductRef.value.filter(
    (x) => x.id == Number(idProduct)
  )[0].productName;
  importProduct.quantity = quantity;
  inboundReceipt.listImportProductDto?.push(importProduct);

  AddProduct.value = false;
};
function RemoveImportProduct(idProduct: number) {
  inboundReceipt.listImportProductDto?.splice(idProduct);
}
//lấy dữ liệu từ DB rồi cho vào một biến lưu trữ, khi nào cần thì thì đem ra dùng
SearchWarehouse(GetListModels).then((resule) => {
  listWarehouse = resule;
  listWarehouseRef.value = listWarehouse.data?.data ?? [];
});
SearchSupplier(GetListModels).then((resule) => {
  listSupplier = resule;
  listSupplierRef.value = listSupplier.data?.data ?? [];
});

async function searchProduct() {
  if (Supplier.value.length == 0) {
  } else {
    const filter: Filter = {
      FieldName: "SupplierId",
      Value: String(Supplier.value),
      Operation: "search",
    };
    GetListModels.Filters?.push(filter);
    await SearchSupplierProduct(GetListModels).then((resule) => {
      listSupplierProduct = resule;
      listSupplierProductRef.value = listSupplierProduct.data?.data ?? [];
      console.log(listSupplierProductRef.value);
      console.log(listSupplierProduct.data);
    });
  }
}
//theo dõi nếu supplier thay đổi thì sẽ tìm product theo supplier
watch(Supplier, searchProduct);

const Add = () => {
  AddProduct.value = true;
};

const createInboundReceipt = async () => {
  inboundReceipt.supplierId = Number(Supplier.value);
  inboundReceipt.warehouseId = Number(Warehouse.value);
  await CreateInboundReceipt(inboundReceipt);
  inboundReceipt.listImportProductDto?.forEach((item) => {
    const productRemaining: ProductRemainingDtos = {
      id: undefined,
      quantity: item.quantity,
      productId: item.productId,
      productName: item.productName,
      warehouseId: Number(Warehouse.value),
      warehouseName: "",
      supplierId: Number(Supplier.value),
      supplierName: "",
    };
    UpdateProductRemainming(productRemaining).then((resule) => {
      console.log(resule.data);
    })
  })
};
//cách hoạt động
/*
tạo ra một inboundReceipt trước
sau đó thêm các importProduct vào sẽ nhập số lượng (tất nhien sẽ có một nút để xóa nó ra)
sau khi nhập importProduct rồi sẽ bấm nút add để thêm vào list
sau khi thêm đủ các importProduct vào inboundReceipt thì sẽ Save
sau khi Save sẽ cập nhật lại số sản phẩm trong kho (Phần này tạm chưa làm)
*/
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
