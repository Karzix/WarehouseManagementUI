import type { AppResponse } from "@/Models/AppResponse";
import type { OutboundReceiptDtos } from "@/Models/Dtos/OutboundReceiptDtos";
import { axiosInstance } from "../axiosConfig";
import router from "@/router";


export const CreateOutboundReceipt = async (model: OutboundReceiptDtos): Promise<AppResponse<OutboundReceiptDtos>> => {
    
    let result: AppResponse<OutboundReceiptDtos> = {
        isSuccess: false,
        message: "",
        data: model,
    };
    console.log(model);
    try {
        var respons = await axiosInstance.post("OutboundReceipt", model);
        result.data = respons.data.data;
        result.message = respons.data.message;
        result.isSuccess = respons.data.isSuccess;
        if (result.isSuccess) {
            router.push('/OutboundReceipt');
        } else {
            console.error(result.message);
        }
    } catch (ex) {
        console.error(ex);
    }
    return result;
}