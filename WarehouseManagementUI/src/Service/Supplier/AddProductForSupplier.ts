import type { AppResponse } from "@/Models/AppResponse";
import { ProductDtos } from "@/Models/Dtos/ProductDtos";
import { axiosInstance } from "../axiosConfig";
import { SupplierProductDtos } from "@/Models/Dtos/SupplierProductDtos";
import router from "@/router";

 
export const CreateNewProduct = async (Product:ProductDtos, supplierId: number): Promise<AppResponse<SupplierProductDtos>> =>{
    let resust: AppResponse<SupplierProductDtos> = {
        isSuccess: false,
        message: "",
        data: undefined
      };
    console.log(Product)
        try{
            var respons =  await axiosInstance.post('Product', Product);
            console.log(respons.data.data.id);
            if(respons.data.isSuccess){
                var supplierProduct = new SupplierProductDtos();
                supplierProduct.supplierId = supplierId;
                supplierProduct.productId = respons.data.data.id;
                console.log(supplierProduct)
                var respons2 = await axiosInstance.post('SupplierProduct', supplierProduct)
                resust.data = respons2.data.data;
                resust.message = respons2.data.message;
                resust.isSuccess = respons2.data.isSuccess;
                if(resust.isSuccess){
                    router.push(`/Supplier/${supplierId}`)
                }
                else{
                    console.log(resust.message);
                }
            }
            else{
                alert(resust.message);
            }
        }
        catch(ex){
            alert("Create fail");
        }
        return resust;
}
export const AddProduct =  async(ProductId: number, SupplierId: number) : Promise<AppResponse<SupplierProductDtos>>=>{
    let resust: AppResponse<SupplierProductDtos> = {
        isSuccess: false,
        message: "",
        data: undefined
      };
        try{
                var supplierProduct = new SupplierProductDtos();
                supplierProduct.supplierId = SupplierId;
                supplierProduct.productId = ProductId;
                var respons2 = await axiosInstance.post('SupplierProduct', supplierProduct)
                resust.data = respons2.data.data;
                resust.message = respons2.data.message;
                resust.isSuccess = respons2.data.isSuccess;
                if(resust.isSuccess){
                    router.push(`/Supplier/${SupplierId}`)
                }
                else{
                    console.log(resust.message);
                    alert(resust.message)
                }
        }
        catch(ex){
            alert("Create fail");
        }
        return resust;
}