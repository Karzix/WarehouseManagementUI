import type { AppResponse } from "@/Models/AppResponse";
import { axiosInstance } from "../axiosConfig";
import {InboundReceiptDtos} from '@/Models/Dtos/InboundReceiptDtos'
import router from "@/router";

 
export const CreateInboundReceipt = async (model:InboundReceiptDtos): Promise<AppResponse<InboundReceiptDtos>> =>{
    let resust: AppResponse<InboundReceiptDtos> = {
        isSuccess: false,
        message: "",
        data: model
      };
    console.log(model)
        try{
            var respons =  await axiosInstance.post('InboundReceipt', model);
            resust.data = respons.data.data;
            resust.message = respons.data.message;
            resust.isSuccess = respons.data.isSuccess;
            if(resust.isSuccess){
            router.push('/InboundReceipt');
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