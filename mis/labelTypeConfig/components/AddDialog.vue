<template>
    <div>
        <el-dialog
            :title="title"
            :visible.sync="info.visible"
            top="20px"
            :before-close="resetForm"
            :close-on-click-modal="false"
        >
            <el-form
                ref="form"
                :model="query"
                :rules="rules"
                label-position="right"
                :label-width="dialogStyle.formLabelWidth"
            >
                <el-form-item label="主体(业务线/对象)：" prop="bizType">
                    <el-select
                        v-model="query.bizType"
                        :disabled="info.type === 'edit'"
                        clearable
                        filterable
                        size="small"
                        :style="dialogStyle.formInputWidth"
                    >
                        <el-option
                            v-for="opt in bizOptions"
                            :key="opt.code"
                            :label="opt.name"
                            :value="opt.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签ID：" prop="tagId">
                    <el-input
                        v-model.number="query.tagId"
                        type="number"
                        size="small"
                        placeholder="请输入"
                        :style="dialogStyle.formInputWidth"
                    ></el-input>
                    <el-button
                        v-if="info.type === 'add' && query.bizType"
                        icon="el-icon-refresh-right"
                        round
                        title="重新获取标签id"
                        @click="getAvailableId(query.bizType)"
                    ></el-button>
                </el-form-item>
                <el-form-item label="标签名称：" prop="tagName">
                    <el-input
                        v-model="query.tagName"
                        size="small"
                        maxlength="20"
                        show-word-limit
                        placeholder="请输入"
                        :style="dialogStyle.formInputWidth"
                    ></el-input>
                </el-form-item>
                <el-form-item label="标签类型：" prop="tagTypeId">
                    <el-select
                        v-model="query.tagTypeId"
                        filterable
                        clearable
                        size="small"
                        :style="dialogStyle.formInputWidth"
                    >
                        <el-option v-for="opt of options.tagTypeId" :key="opt.code" :label="opt.name" :value="opt.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：" prop="description">
                    <el-input
                        v-model="query.description"
                        type="textarea"
                        size="small"
                        :autosize="{ minRows: 2, maxRows: 8 }"
                        maxlength="200"
                        show-word-limit
                        placeholder="请输入内容，最多支持200个字符"
                        :style="dialogStyle.formInputWidth"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="是否可配置规则：" prop="tagRuleConfigurable">
                    <el-switch v-model="query.tagRuleConfigurable" :active-value="1" :inactive-value="0"> </el-switch>
                </el-form-item>
                <el-form-item label="是否可配置触发事件：" prop="triggerEventConfigurable">
                    <el-switch v-model="query.triggerEventConfigurable" :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="resetForm">取消</el-button>
                <el-button size="small" type="primary" @click="submitForm">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { baseMixin } from '@/mixin';
import { stringify, getMapValueByKeyGet } from '@/assets/js/helper';
import kop from '@/assets/js/kop';

export default {
    name: 'AddDialog',
    mixins: [baseMixin],
    props: ['info', 'resetFun', 'reset', 'bizOptions'],
    data() {
        const validatorData = (rule, value, callback) => {
            switch (rule.field) {
                case 'bizType':
                    if (!value) callback(new Error('请输入业务线！'));
                    callback();
                    break;
                case 'tagName':
                    if (!value) callback(new Error('请输入标签名称！'));
                    callback();
                    break;
                case 'tagRuleConfigurable':
                    // if (typeof value !== 'boolean') callback(new Error('请选择是否配置规则！'))
                    callback();
                    break;
                case 'triggerEventConfigurable':
                    // if (typeof value !== 'boolean') callback(new Error('请选择是否配置触发事件！'))
                    callback();
                    break;
                default:
                    callback();
                    break;
            }
        };
        return {
            baseMixin_moduleName: '/g/hmmis/labelTypeConfig.node',
            query: {
                bizType: '',
                tagId: null,
                tagName: '',
                tagTypeId: '',
                tagTypeName: '',
                description: '',
                tagRuleConfigurable: 1,
                triggerEventConfigurable: 1
            },
            rules: {
                bizType: [{ required: true, validator: validatorData, trigger: 'change' }],
                tagId: [
                    {
                        type: 'number',
                        required: true,
                        message: '请输入标签Id',
                        trigger: 'change'
                    }
                ],
                tagName: [{ required: true, validator: validatorData, trigger: 'change' }],
                // tagTypeId: [{ required: true, validator: validatorData, trigger: 'change'}],
                tagRuleConfigurable: [{ required: true, validator: validatorData, trigger: 'change' }],
                triggerEventConfigurable: [{ required: true, validator: validatorData, trigger: 'change' }]
            },
            options: {
                bizType: [],
                tagTypeId: []
            },
            dialogStyle: {
                formLabelWidth: '180px',
                formInputWidth: 'width:300px'
            }
        };
    },
    computed: {
        title() {
            return this.info.type === 'add' ? '新增' : '编辑';
        }
    },
    watch: {
        // 'info.visible'(newVal)  {
        // },
        'query.tagTypeId': function(newVal) {
            this.query.tagTypeName = '';
            if (newVal || newVal === 0) {
                this.query.tagTypeName = this.options.tagTypeId.find(o => o.code === this.query.tagTypeId).name;
            }
        },
        'query.bizType': function(newVal) {
            this.query.tagTypeId = '';
            this.query.tagTypeName = '';
            if (newVal) {
                this.queryTagTypeOptions(newVal);
            }

            if (newVal && this.info.type === 'add') {
                this.getAvailableId(newVal);
            }
        }
    },
    methods: {
        // 表单提交
        submitForm() {
            this.$refs.form.validate(valid => {
                if (!valid) return;
                const actype = 'saveAssetTag';
                let { ...req } = this.query;
                req = stringify(req);
                this.screenLoading = true;
                this.__request(this.baseMixin_moduleName, {
                    actype,
                    sendData: req
                })
                    .then(res => {
                        this.screenLoading = false;
                        if (res.code === 0) {
                            this.$message.success('操作成功');
                            this.resetForm();
                            this.resetFun && this.resetFun();
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                    .catch(() => {
                        this.screenLoading = false;
                        this.$message.error('数据获取失败');
                    });
            });
        },
        // 表单reset
        resetForm() {
            this.$refs.form.resetFields();
            this.query.id = '';
            this.reset && this.reset();
        },
        queryTagTypeOptions(subjectTypeId) {
            this.$kop.send('bh.assetprofile.queryTagTypeBySubjectTypeList', {subjectTypeId}).then((res) => {
                console.log(res, 'resres');
                if (res.data.code === 200) {
                    this.options.tagTypeId = res.data.data;
                }
            });
        },
        getAvailableId(subjectTypeId) {
            this.$kop.send('bh.assetprofile.queryLatestAvailableTagId', { subjectTypeId }).then((res) => {
                console.log(res, 'res2res');
                if (res.data.code === 200) {
                    this.query.tagId = res.data.data;
                }
            });
        },
        getMapValueByKeyGet,
        stringify
    }
};
</script>
<style lang="scss" scoped></style>
