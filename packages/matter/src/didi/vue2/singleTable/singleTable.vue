<template>
    <div>
        <div class="singleTitle">{{ singleTitle }}</div>
        <el-table :data="info" style="width: 100%">
            <el-table-column v-if="singleIndex" type="index" :index="indexMethod" label="序号">
            </el-table-column>
            <el-table-column v-for="item in tableColumn" :prop="item.prop" :label="item.label">
                <template slot-scope="scope">
                    {{ scope.row[item.prop] ? scope.row[item.prop] : scope.row[item.prop] == 0 ? 0 : '-' }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'singleTable',
    props: {
        singleTableList: {
        }
    },
    watch: {
        'singleTableList.info': function (data) {
            console.log(this, 'this11111');
            this.setInfo(data)
        }
    },
    components: {},
    data() {
        return {
            singleTitle: '',
            tableColumn: [],
            singleIndex: false,
            info: []
        }
    },
    async mounted() {
        this.info = this.singleTableList.info
        this.singleTitle = this.singleTableList.singleTitle
        this.singleIndex = this.singleTableList.singleIndex
        this.tableColumn = this.singleTableList.tableColumn
        console.log(this.info, '====');
    },
    methods: {
        setInfo(data) {
            this.info = data
        },
        indexMethod(index) {
            return index + 1;
        },
    }
}
</script>
<style lang="scss" scoped>
.singleTitle {
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0;
}
</style>
