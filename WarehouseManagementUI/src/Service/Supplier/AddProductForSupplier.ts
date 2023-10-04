import type { AppResponse } from "@/Models/AppResponse";
import { ProductDtos } from "@/Models/Dtos/ProductDtos";
import { axiosInstance } from "../axiosConfig";
import { SupplierProductDtos } from "@/Models/Dtos/SupplierProductDtos";
import router from "@/router";

 
export const CreateNewProduct = async (Product:ProductDtos, supplierId: string): Promise<AppResponse<SupplierProductDtos>> =>{
    let resust: AppResponse<SupplierProductDtos> = {
        isSuccess: false,
        message: "",
        data: undefined
      };
    console.log(Product)
        try{
            var respons =  await axiosInstance.post('Product', Product);
            if(respons.data.isSuccess){
                var supplierProduct = new SupplierProductDtos();
                supplierProduct.SupplierId = supplierId;
                supplierProduct.ProductId = Product.id;
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
export const AddProduct =  async(ProductId: string, SupplierId: string) : Promise<AppResponse<SupplierProductDtos>>=>{
    let resust: AppResponse<SupplierProductDtos> = {
        isSuccess: false,
        message: "",
        data: undefined
      };
        try{
                var supplierProduct = new SupplierProductDtos();
                supplierProduct.SupplierId = SupplierId;
                supplierProduct.ProductId = ProductId;
                var respons2 = await axiosInstance.post('SupplierProduct', supplierProduct)
                resust.data = respons2.data.data;
                resust.message = respons2.data.message;
                resust.isSuccess = respons2.data.isSuccess;
                if(resust.isSuccess){
                    router.push(`/Supplier/${SupplierId}`)
                }
                else{
                    console.log(resust.message);
                }
        }
        catch(ex){
            alert("Create fail");
        }
        return resust;
}