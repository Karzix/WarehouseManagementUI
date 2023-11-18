<template>
    <div class="d-flex justify-content-around align-items-center w-100">
        <div class="d-flex align-items-center">
            <div v-for="filter in filters">
                <div>
                    <el-input v-model="filter.Value" :placeholder="filter.DisplayName"
                        v-if="filter.Type == undefined || filter.Type == 'text'" class="">
                    </el-input>
                </div>
                <div class="ml-4">
                    <el-select v-model="filter.Value" :placeholder="filter.DisplayName" v-if="filter.Type == 'dropdown'">
                        <el-option v-for="item in filter.dropdownData.data" :key="item[filter.dropdownData.keyMember]"
                            :label="item[filter.dropdownData.displayMember]" :value="item[filter.dropdownData.keyMember]" />
                    </el-select>
                </div>
            </div>
            <button @click="handlebtnSearchClicked" class="btn btn-primary btn-rounded rounded-pill px-3">Search</button>
        </div>
        <button @click="handlebtnAddClicked" v-if="allowAdd"
            class="btn btn-warning btn-rounded rounded-pill px-3">Create</button>
    </div>
</template>

<script setup lang="ts">
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Plus,
} from '@element-plus/icons-vue';

// @ts-ignore
import { TableColumn } from './Models/TableColumn.ts'

// @ts-ignore
import { Filter } from '../BaseModels/Filter';

import { ref } from 'vue';
import type { CustomAction } from './Models/CustomAction';
const props = defineProps<{
    tableColumns: TableColumn[];
    allowAdd: boolean;
    CustomActions: CustomAction[];
}>();

const emit = defineEmits<{
    (e: 'onBtnAddClicked'): void;
    (e: 'onBtnSearchClicked', filters: Filter[]): void;
}>();
const filters = ref<Filter[]>([]);

props.tableColumns.forEach(colum => {
    if (colum.showSearch) {
        const newFilter: Filter = {
            FieldName: colum.key,
            DisplayName: colum.label,
            Value: "",
            Operation: "",
            Type: colum.inputType,
            dropdownData: colum.dropdownData,
        };
        filters.value?.push(newFilter);
    }
});
const handlebtnAddClicked = () => {
    //console.log("btn add click");
    emit("onBtnAddClicked");
    //console.log("not err");
}
const handlebtnSearchClicked = () => {
    const filtersRequest = filters.value.filter(filter => filter.Value !== null && filter.Value !== undefined && filter.Value != "");

    emit("onBtnSearchClicked", filtersRequest);
}
</script>
<style scoped>
.action-pane {
    width: "100%";
    padding: 10px;
}

.action-pane .buttons {
    float: right;
    text-align: right;
}

button {
    margin-left: 5px;
}

.el-input {
    max-width: 290px;
}
</style>