<!-- PRD: http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=350266754
  接口文档： -->
<template>
    <div v-cloak v-loading.fullscreen.lock="screenLoading">
        <el-form ref="form" label-position="right" :inline="true" :model="query"
            :label-width="formStyle.formLabelWidth">
            <el-form-item label="主体(业务线/对象)：" prop="bizType" :rules="{
                required: true,
                message: '请选择主体(业务线/对象)！',
                trigger: 'change'
            }">
                <el-select v-model="query.bizType" filterable clearable size="small" :style="formStyle.formInputWidth">
                    <el-option v-for="opt in options.bizType" :key="opt.code" :label="opt.name" :value="opt.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签名称：" prop="tagName">
                <el-input v-model="query.tagName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item class="btnBox">
                <el-button type="info" size="small" icon="el-icon-plus"
                    @click="toggleAddDialog(true, {}, 'add')">新增</el-button>
                <el-button type="primary" size="small" icon="el-icon-search" @click="queryList(1)">查询</el-button>
            </el-form-item>
            <el-form-item label="标签类型：" prop="tagTypeId">
                <el-select v-model="query.tagTypeId" filterable clearable size="small"
                    :style="formStyle.formInputWidth">
                    <el-option v-for="opt of options.tagTypeId" :key="opt.code" :label="opt.name" :value="opt.code">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div>
            <Table :info="tableInfo" :list="list" :get-format="getFormat" :options="options">
                <template slot="after">
                    <!-- <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="openDetail(scope.row)">查看</el-button>
            </template>
          </el-table-column> -->
                </template>
            </Table>
            <el-pagination class="inLineCenter" :current-page.sync="query.pageNum" :page-size="query.pageSize"
                :total="query.total" small layout="total,prev,pager,next,jumper" @size-change="queryList"
                @current-change="queryList">
            </el-pagination>
        </div>
        <AddDialog :reset="() => toggleAddDialog(false, {}, 'add')" :reset-fun="queryList" :info="addInfo"
            :biz-options="options.bizType" />
    </div>
</template>
<script>
import { baseMixin, mixin } from '@/mixin';
import { stringify } from '@/assets/js/helper';
import { TABLE_HEADER } from './constant';
import Table from './components/Table';
import AddDialog from './components/AddDialog';
import kop from '@/assets/js/kop';

export default {
    name: 'App',
    components: {
        Table,
        AddDialog
    },
    mixins: [baseMixin, mixin],
    data() {
        return {
            screenLoading: false,
            baseMixin_moduleName: '/didibike/misassets/labelTypeConfig.node',
            query: {
                bizType: '',
                tagName: '',
                tagTypeId: '',
                pageNum: 1,
                pageSize: 20
            },
            addInfo: {},
            list: [],
            tableInfo: {
                tableHeader: TABLE_HEADER
            },
            options: {
                tagTypeId: [],
                bizType: []
            },
            formStyle: {
                formLabelWidth: '160px',
                formInputWidth: 'width:180px'
            }
        };
    },
    mounted() {
        this.getBizTypeOptions();
        this.query.bizType = 2;
        this.queryList();
    },
    watch: {
        'query.bizType': function (newVal) {
            this.query.tagTypeId = '';
            this.options.tagTypeId = [];
            this.queryTagTypeOptions(newVal);
        }
    },
    methods: {
        queryList(val = 1) {
            this.$refs.form.validate(valid => {
                if (!valid) return;
                this.query.pageNum = val;
                let req = JSON.parse(JSON.stringify(this.query));
                const actype = 'queryAssetTag';
                req = stringify(req);
                this.screenLoading = true;
                this.__request(this.baseMixin_moduleName, {
                    actype,
                    sendData: req
                })
                    .then(res => {
                        this.screenLoading = false;
                        const { pageNum, pageSize } = this.query;
                        if (res.code === 200) {
                            this.list = res.data;
                            this.query.total =
                                res.data.length < pageSize ? (pageNum - 1) * pageSize + res.data.length : null;
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                    .catch(() => {
                        this.screenLoading = false;
                        this.$message.error('列表数据获取失败！');
                    });
            });
        },
        toggleAddDialog(visible, data, type) {
            this.addInfo = {
                visible,
                data,
                type
            };
        },
        getFormat(row, column, cellValue) {
            switch (column.label) {
                case '业务线':
                    return this.options.bizType.find(o => o.code === cellValue).name;
                case '是否可配置规则':
                    return cellValue ? '是' : '否';
                case '是否可配置触发事件':
                    return cellValue ? '是' : '否';
                default:
                    return cellValue;
            }
        },
        getBizTypeOptions() {
            this.$kop.send('bh.assetprofile.queryAssetSubjectTypeList', {}).then((res) => {
                console.log(res, 'res2res');
                if (res.data.code === 200) {
                    this.options.bizType = res.data.data;
                }
            });
        },
        queryTagTypeOptions(subjectTypeId) {
            this.$kop.send('bh.assetprofile.queryTagTypeBySubjectTypeList', {subjectTypeId}).then((res) => {
                console.log(res, 'resres');
                if (res.data.code === 200) {
                    this.options.tagTypeId = res.data.data;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.inLineCenter {
    text-align: center;
}

.btnBox {
    float: right;
}
</style>
