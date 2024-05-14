<template>
    <div>
        <el-descriptions :column="column" :title="title">
            <template v-for="item in info">
                <el-descriptions-item :label="item.label">{{ format1(item) }}</el-descriptions-item>
            </template>
        </el-descriptions>
    </div>
</template>

<script>
import { pickBy, isEmpty, get } from 'lodash';
import FormatTime from '@/assets/js/timeUtil';
import { curry } from 'ramda';
export default {
    name: 'descriptions',
    props: {
        descriptionList: {
        }
    },
    components: {},
    watch: {
        'descriptionList.titleSupplement': function (data) {
            this.setInfo(data)
        }
    },
    data() {
        return {
            title: '',
            column: 4,
            titleSupplement: '',
            info: []
        }
    },
    async mounted() {
        this.titleSupplement = this.descriptionList.titleSupplement
        this.title = this.descriptionList.title ? this.descriptionList.title + ': ' + this.titleSupplement : false
        this.column = this.descriptionList.column ? this.descriptionList.column : this.column
        this.info = this.descriptionList.info
    },
    methods: {
        setInfo(value) {
            this.titleSupplement = value
        },
        format1(item) {
            if (item.type === 'date') {
                return this.formatTime(item.value)
            } else if (item.postList && item.postList.length > 0) {
                console.log(11, item);
                const cu = item.postList.find(curr => curr.value == item.value)
                return cu && cu.label ? cu.label : '-'
            } else {
                return item.value
            }
        },
        formatTime(date) {
            return FormatTime.formatTime(date, 'yyyy-MM-dd HH:mm:ss');
        }
    }
}
</script>
<style lang="scss" scoped></style>
  