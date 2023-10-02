<template>
    <el-row>
        <el-col :span="24">
            <el-row class="ep-bg-purple-dark el-col-24 action-pane">
                <el-col :span="12">
                    <el-row>
                        <div v-for="filter in filters">
                        <el-input v-model="filter.Value"></el-input>

                    </div>
                    <el-button :icon="Search" circle @click="handlebtnSearchClicked"> search</el-button>

                    </el-row>
                   
                </el-col>

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

// @ts-ignore
import { TableColumn } from './Models/TableColumn.ts'

// @ts-ignore
import { Filter } from '../BaseModels/Filter';

import { ref } from 'vue';
const props = defineProps<{
    tableColumns: TableColumn[];
    allowAdd: boolean;
}>();

const emit = defineEmits<{
    (e: 'onBtnAddClicked'): void;
    (e: 'onBtnSearchClicked'): void;
}>();
const filters = ref<Filter[]>([]);

props.tableColumns.forEach(colum => {
    if (colum.showSearch) {
        const newFilter = {
            FieldName: colum.key,
            Value: "",
        };
        filters.value?.push(newFilter);
    }
});
console.log(filters.value);
const handlebtnAddClicked = () => {
    emit("onBtnAddClicked");
}
const handlebtnSearchClicked = () => {
    emit("onBtnSearchClicked");
}
</script>
<style >
.action-pane {
    width: "100%";
    padding: 10px;
}

.action-pane .buttons {
    float: right;
    text-align: right;
}
button{
    margin-left: 5px;
}
</style>