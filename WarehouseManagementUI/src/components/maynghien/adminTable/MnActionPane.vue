<template>
    <el-row>
        <el-col :span="24">
            <el-row class="ep-bg-purple-dark el-col-24 action-pane">
                <el-col :span="24">
                    <el-row>
                        <div v-for="filter in filters">

                            <el-input v-model="filter.Value" :placeholder="filter.DisplayName"></el-input>

                        </div>
                        <el-button :icon="Search" circle @click="handlebtnSearchClicked"> search</el-button>

                    </el-row>

                </el-col>



            </el-row>
            <el-row>
                <el-col :span="12" class="buttons">

                    <el-button :icon="Plus" circle @click="handlebtnAddClicked" v-if="allowAdd"> Create</el-button>
                </el-col>

            </el-row>
        </el-col>
    </el-row>
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

import { TableColumn } from './Models/TableColumn';

import { Filter } from '../BaseModels/Filter';

import { ref } from 'vue';
const props = defineProps<{
    tableColumns: TableColumn[];
    allowAdd: boolean;
}>();

const emit = defineEmits<{
    (e: 'onBtnAddClicked'): void;
    (e: 'onBtnSearchClicked', filters: Filter[]): void;
}>();
const filters = ref<Filter[]>([]);

props.tableColumns.forEach(colum => {
    if (colum.showSearch) {
        const newFilter = {
            FieldName: colum.key,
            DisplayName: colum.label,
            Value: "",
            Operation: undefined
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
    /* padding: 10px; */
}

.action-pane .buttons {
    float: right;
    text-align: right;
}

button {
    margin-left: 5px;
}
.el-row{
    display: flex !important;
}
.el-button{
    margin: 0;
}
</style>