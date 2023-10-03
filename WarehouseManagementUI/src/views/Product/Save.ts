import { ProductDtos } from "@/Models/Dtos/ProductDtos";
import { EditProduct } from '../../Service/Product/Edit';
import router from "@/router";
import { ProductRef } from "./Edit.vue";

export const Save = async () => {
var Product = new ProductDtos();
Product = {
id: ProductRef.value.id,
name: ProductRef.value.name,
description: ProductRef.value.description,
quantity: ProductRef.value.quantity,
};
try {
const respone = await EditProduct(Product);
if (!respone.isSuccess) {
console.log(respone.message);
}
else {
router.push("/Product");
}
}
catch (ex) {
console.error(ex);
}
};
