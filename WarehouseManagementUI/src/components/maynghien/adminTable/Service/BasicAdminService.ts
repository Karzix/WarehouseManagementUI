
import { AppResponse } from '../../../../Models/AppResponse'

import { SearchRequest } from '../../BaseModels/SearchRequest.js'

import { SearchResponse } from '../../BaseModels/SearchResponse'
import { axiosInstance } from "../../../../Service/axiosConfig"
import {Filter} from "../../BaseModels/Filter";
import {SortByInfo} from "../../BaseModels/SortByInfo";



import { TableColumn } from '../Models/TableColumn.js'
import { SearchDTOItem } from '../Models/SearchDTOItem.js'


export const handleAPISearch = async (model: SearchRequest, apiurl: string): Promise<AppResponse<SearchResponse<SearchDTOItem[] | undefined>>> => {

    let resust: AppResponse<SearchResponse<SearchDTOItem[] | undefined>> = ({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const postResult = await axiosInstance.post(apiurl + "/search", model);
        console.log(postResult.data);
        const responseObject = postResult.data
        resust = responseObject;
        if (resust.isSuccess) {
            return resust;
        }
        else {
            console.log(resust.message);
            return resust;
        }
    } catch (error) {
        console.error(error);

    }
    return resust;

}

export const handleAPICreate = async (model: SearchDTOItem, apiurl: string): Promise<AppResponse<SearchDTOItem | undefined>> => {

    let resust: AppResponse<SearchDTOItem | undefined> = ({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const postResult = await axiosInstance.post(apiurl, model);
        console.log(postResult.data);
        const responseObject = postResult.data
        resust = responseObject;
        if (resust.isSuccess) {
            return resust;
        }
        else {
            console.log(resust.message);
            return resust;
        }
    } catch (error) {
        console.error(error);

    }
    return resust;

}

export const handleAPIUpdate = async (model: SearchDTOItem, apiurl: string): Promise<AppResponse<SearchDTOItem | undefined>> => {

    let resust: AppResponse<SearchDTOItem | undefined> = ({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const postResult = await axiosInstance.put(apiurl, model);
        console.log(postResult.data);
        const responseObject = postResult.data
        resust = responseObject;
        if (resust.isSuccess) {
            return resust;
        }
        else {
            console.log(resust.message);
            return resust;
        }
    } catch (error) {
        console.error(error);

    }
    return resust;

}

export const handleAPIDelete = async (id: string, apiurl: string): Promise<AppResponse<undefined>> => {

    let resust: AppResponse<undefined> = ({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const deleteUrl = apiurl + "/" + id;
        const postResult = await axiosInstance.delete(deleteUrl);
        console.log(postResult.data);
        const responseObject = postResult.data
        resust = responseObject;
        if (resust.isSuccess) {
            return resust;
        }
        else {
            console.log(resust.message);
            return resust;
        }
    } catch (error) {
        console.error(error);

    }
    return resust;

}