<template>
    <div class="wrapSuppliedList">
        <div class="wrap-form">
            <el-form :inline="formStyleLine" :label-width="labelWidth" :label-position="labelPositon" :model="formInline"
                :ref="formName" class="demo-form-inline">
                <template v-for="(desc, descIndex) in formDescList">
                    <el-form-item v-if="desc.type === 'select'" :key="descIndex + desc.name" :label="desc.name"
                        :prop="desc.field" :rules="desc.rules">
                        <div v-if="false">{{ desc.field }}</div>
                        <el-select clearable @change="getRelyOnList(desc)" @clear="getRelyOnList(desc)"
                            v-model="formInline[desc.field]" placeholder="请选择">
                            <el-option v-for="item in desc.postList" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="desc.type === 'input'" :key="descIndex + desc.name" :label="desc.name"
                        :prop="desc.field" :rules="desc.rules">
                        <el-input @change="getInputForm(desc)" v-model="formInline[desc.field]"
                            placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item v-if="desc.type === 'daterange'" :key="descIndex + desc.name" :label="desc.name"
                        :prop="desc.field" :rules="desc.rules">
                        <el-date-picker :style="{ width: '230px' }" @change="getDaterangeForm(desc)"
                            @clear="getDaterangeForm(desc)" v-model="formInline[desc.field]" type="daterange" clearable
                            range-separator="～" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="desc.type === 'month' && desc.pickShow" :key="descIndex + desc.name"
                        :label="desc.name" :prop="desc.field" :rules="desc.rules">
                        <el-date-picker :style="{ width: '230px' }" :disabled="!formInline[desc.disabled]"
                            @change="getMonthForm(desc)" @clear="getMonthForm(desc)" v-model="formInline[desc.field]"
                            type="month" value-format="yyyy-MM" placeholder="请选择">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="desc.type === 'year' && desc.pickShow" :key="descIndex + desc.name"
                        :label="desc.name" :prop="desc.field" :rules="desc.rules">
                        <el-date-picker :style="{ width: '230px' }" :disabled="!formInline[desc.disabled]"
                            @change="getYearForm(desc)" v-model="formInline[desc.field]" @clear="getYearForm(desc)"
                            type="year" value-format="yyyy" placeholder="请选择">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="desc.type === 'upload'" label="上传文件" prop="url" :label-width="labelWidth"
                        :prop="desc.field" :rules="desc.rules">
                        <el-upload ref="uploadFile" class="upload" :multiple="desc.multiple" drag accept=".xlsx, .xls"
                            :action="dialogUploadUrl + '/upload/img.node'" enctype="multipart/form-data"
                            :data="{ innerPublic: 'public' }" 
                            :limit="desc.limit" :before-upload="desc.beforeUpload"
                            :on-success="desc.uploadSuccess" :on-error="uploadError"
                            :file-list="filesList"
                            :on-remove="desc.onRemove">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                将文件拖到此处，或<em>点击上传</em>
                            </div>
                            <div class="el-upload__tip" slot="tip">
                                <p v-if="formInline.period">
                                    <span v-if="formInline.period == 1">
                                        <a href="https://img-hxy021.didistatic.com/static/starfile/node20230315/895f1e95e30aba5dd56d6f2ccf768b57/lUJS8QGaSW1678866898552.xlsx"
                                        download style="color: #fa8919">年需求计划模板</a>
                                    </span>
                                    <span v-if="formInline.period == 2">
                                        <a href="https://img-hxy021.didistatic.com/static/starfile/node20230315/895f1e95e30aba5dd56d6f2ccf768b57/oQkp8ROFky1678866928011.xlsx"
                                        download style="color: #fa8919">月需求计划模板</a>
                                    </span>
                                </p>
                            </div>
                        </el-upload>
                    </el-form-item>
                </template>
                <div v-if="formActions.formDialogBtns && formActions.formDialogBtns.length > 0" class="wrapDialogBtns">
                    <template
                        v-for="btn in formActions.formDialogBtns">
                        <el-button :type="btn.type" :disabled="disableBtnDialog(btn)" @click="dialogForm(btn)">{{ btn.name }}</el-button>
                    </template>
                </div>
                <template v-for="btn in formSearchBtns">
                    <el-form-item>
                        <el-dropdown v-if="btn.class == 'dropdown'" @command="handleCommand">
                            <el-button class="el-dropdown-link">
                                <span class="el-dropdown-link">
                                    {{ btn.name }}
                                </span>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in btn.btnChooseList" :command="item.command">{{ item.title
                                }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-button v-else :type="btn.type" @click="submitForm(btn)">{{ btn.name }}</el-button>
                    </el-form-item>
                </template>
            </el-form>
        </div>
        <div class="wrap-content" v-if="formType === 'formTable'">
            <div :class="tableTopBtn && tableTopBtn.length > 0 ? 'marginBody' : ''">
                <div class="wrapTopBtn">
                    <div class="topBtnMargin" v-for="(topBtn, topIndex) in tableTopBtn">
                        <el-button :type="topBtn.type" @click="topBtn.fn(multipleSelection)">{{
                            topBtn.name
                        }}</el-button>
                    </div>
                </div>
                <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
                    <template v-for="(desc, descIndex) in tableDescList">
                        <el-table-column v-if="!desc.selection" :width="desc.width" :type="getTypeSelection(desc.selection)"
                            :prop="desc.field" :label="desc.tableColOtherName ? desc.tableColOtherName : desc.name">
                            <template slot-scope="scope">
                                <div v-if="desc.operation && desc.operation.length > 0">
                                    <div v-if="desc.showFn && desc.showFn(scope.row)">
                                        <template v-for="btn in desc.operation">
                                            <span class="lineBtn btnSpan" v-if="btnShowfn(scope.row, btn)"
                                                @click.stop="tableBtnList(scope.row, btn)">{{ btn.name }}</span>
                                        </template>
                                    </div>
                                    <div v-else>-</div>
                                </div>
                                <div v-else>
                                    <el-tag v-if="desc.tableTag" :type="findTableTag(desc, scope.row)">{{
                                        tableFormat(desc, scope.row)
                                    }}</el-tag>
                                    <span v-else :class="{'btnSpaCu' : desc.onTableLineClick}" @click="onTableLineClick(desc, scope.row)">{{ tableFormat(desc, scope.row) }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="desc.selection" :selectable="selectableFn" type="selection"
                            width="55"></el-table-column>
                    </template>
                </el-table>
            </div>
            <div class="paginationWrap" v-if="tableData && tableData.length > 0">
                <el-pagination @current-change="searchList" :current-page="page" small :page-size="pageSize" :total="total"
                    :layout="paginationLayout">
                </el-pagination>
            </div>
        </div>
        <ExportTesk ref="exportTesk"></ExportTesk>
    </div>
</template>

<script>
import ExportTesk from '@/components/ExportTesk.vue';
import FormatTime from '@/assets/js/timeUtil';
import { pickBy, isEmpty, get, isArray } from 'lodash';
import { send } from 'process';
export default {
    name: 'formTable',
    props: {
        formActions: {
            tableCfs: {
                type: Array,
            },
            formBtns: {
                type: Array,
                default: () => {
                    return []
                },
            },
        }
    },
    components: {
        ExportTesk
    },
    data() {
        return {
            page: 1,
            pageSize: 20,
            formType: '',
            labelWidth: '',
            labelPositon: '',
            formStyleLine: false,
            pageAbleInner: false,
            screenLoading: false,
            dataUploadFileList: [],
            filesList: [],
            multipleSelection: [],
            paramsArray: [],
            paginationLayout: 'prev, pager, next, jumper',
            operatorName: '',
            operatorId: '',
            pageAble: true,
            total: null,
            tableCfs: [],
            formSearchBtns: [],
            formName: '',
            tableData: [],
            formDescList: [],
            tableDescList: [],
            tableTopBtn: [],
            formInline: {},
            timeFieldList: [],
            dialogUploadUrl: ''
        }
    },
    async mounted() {
        await this.init()
        if (!this.formActions.lock && this.formType == 'formTable') {
            await this.searchList()
        }
        const {
            THISPAGEDATA: { bizEnv = "stable" },
        } = window;
        const urlMap = {
            stable: 'https://page-daily.kuaidadi.com',
            preonline: 'https://prestar.xiaojukeji.com',
            online: 'https://star.xiaojukeji.com'
        };
        console.log(bizEnv, urlMap[bizEnv], 'urlMap[bizEnv]');
        this.dialogUploadUrl = urlMap[bizEnv];
    },
    methods: {
        async init() {
            this.formType = this.formActions.formType
            this.formStyleLine = this.formActions.formStyleLine
            this.labelPositon = this.formActions.labelPositon
            this.labelWidth = this.formActions.labelWidth
            this.tableCfs = this.formActions.tableCfs
            this.formSearchBtns = this.formActions.formSearchBtns
            this.formName = this.formActions.formName
            this.pageAble = this.formActions.pageAble
            this.operatorName = window.THISPAGEDATA.operatorName
            this.operatorId = window.THISPAGEDATA.operatorId
            this.paramsArray = this.formActions.paramsArray
            this.pageAbleInner = this.formActions.pageAbleInner
            this.initFormInline()
            this.tableDescList = this.formActions.tableCfs.filter(item => item.tableColShow !== false).sort((a, b) => a.tableIndex - b.tableIndex)
            this.tableTopBtn = this.formActions.tableTopBtn ? this.formActions.tableTopBtn : []
            await this.initSelectList()
            this.paginationLayout = this.pageAbleInner ?  this.pageAbleInner : this.paginationLayout
            this.timeFieldList = this.formActions.tableCfs.filter(item => item.type === 'daterange').map(item => ({ field: item.field, result: item.result }))
        },
        getTypeSelection(selection) {
            return selection ? 'selection' : ''
        },
        initFormInline() {
            this.formDescList = this.formActions.tableCfs.filter(item => item.search)
            this.formDescList.forEach(element => {
                let initValue = null
                if (element.defaultValue) {
                    initValue = element.defaultValue
                }
                this.$set(this.formInline, element.field, initValue)
            });
        },
        clearFiles() {
            this.filesList = []
        },
        onTableLineClick(desc, row){
            desc.onTableLineClick && desc.onTableLineClick(row)
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        dialogForm(btn) {
            if (btn.class != 'close') {
                console.log(this.dataUploadFileList, this.formInline, 'dataUploadFileList');
                this.$refs[this.formName].validate((valid) => {
                    if (valid) {
                        btn.fn && btn.fn(this.formInline, () => {
                            this.initFormInline()
                        })
                    } else {
                        return false;
                    }
                });
            } else {
                btn.fn && btn.fn(this.formInline, () => {
                    this.initFormInline()
                })
            }
        },
        disableBtnDialog(btn) {
            if (!btn.disable) {
                return false
            } else {
                return btn.disable()
            }
        },
        setUploadUrl(val) {
            this.formInline.dataUrl = val
        },
        getInputForm(desc) {
            desc.changeBack && desc.changeBack(this.formInline[desc.field])
        },
        getDaterangeForm(desc) {
            desc.changeBack && desc.changeBack(this.formInline[desc.field])
        },
        getMonthForm(desc) {
            desc.changeBack && desc.changeBack(this.formInline[desc.field])
        },
        getYearForm(desc) {
            desc.changeBack && desc.changeBack(this.formInline[desc.field])
        },
        tableBtnList(row, btn) {
            if (btn.fn) {
                btn['fn'](row, () => {
                    this.searchList()
                })
            }
        },
        async initSelectList() {
            const selectHandleList = this.formDescList.filter(item => item.postLevel === 1)
            await this.getSelectList(selectHandleList)
        },
        findTableTag(desc, row) {
            const desc1 = desc.postList.find(item => row[desc.field] == item.value)
            return desc1 && desc1['tableTagType']
        },
        async getSelectList(selectHandleList) {
            for (let index = 0; index < selectHandleList.length; index++) {
                const element = selectHandleList[index];
                if (element.postClass === 'kop') {
                    const othersUrl = element.othersUrl ? element.othersUrl : ''
                    const othersValue = element.othersValue ? element.othersValue : ''
                    const postRelyOn = element.postRelyOn ? element.postRelyOn : ''
                    let url = null, parmas = null;
                    if (postRelyOn && this.formInline[postRelyOn] == othersValue) {
                        url = othersUrl
                        parmas = {}
                    } else {
                        url = element.postUrl
                        parmas = this.getParams(element)
                    }
                    const { data: resultData } = await this.$kop.send(url, parmas)
                    // 放回去
                    this.formDescList.forEach(item => {
                        if (item.field === element.field) {
                            let value = null, label = null;
                            if (item.postVL && item.postVL.length > 0) {
                                value = item.postVL[0]
                                label = item.postVL[1]
                            } else {
                                value = item.value ? item.value : ('value' || 'id')
                                label = item.label ? item.label : ('label' || 'displayName')
                            }
                            item.postList = (resultData.data.records || resultData.records || resultData.data).map(ma => {
                                return {
                                    value: ma[value],
                                    label: ma[label]
                                }
                            })
                        }
                    })
                } else {
                    this.getData(
                        element.postUrl,
                        {
                            actype: element.postActype,
                            sendData: JSON.stringify(this.getParams(element))
                        },
                        (res) => {
                            if (res.code === 200) {
                                this.formDescList.forEach(item => {
                                    if (item.field === element.field) {
                                        let value = null, label = null;
                                        if (item.postVL && item.postVL.length > 0) {
                                            value = item.postVL[0]
                                            label = item.postVL[1]
                                        } else {
                                            value = item.value ? item.value : ('value' || 'id')
                                            label = item.label ? item.label : ('label' || 'displayName')
                                        }
                                        if (item.resultField) {
                                            item.postList = res.data[item.resultField].map(ma => {
                                                return {
                                                    value: ma[value],
                                                    label: ma[label]
                                                }
                                            })
                                        } else {
                                            item.postList = res.data.map(ma => {
                                                return {
                                                    value: ma[value],
                                                    label: ma[label]
                                                }
                                            })
                                        }

                                    }
                                })
                            } else {
                                this.$message.error(res.msg);
                            }
                        },
                        function () {
                            this.$message.error('列表数据获取失败~');
                        },
                        this.formActions.postTableMock
                    );
                }
            }
        },
        getData(url, params, _success, _error, mock) {
            const mockData = require('./mock')
            var _this = this;
            _this.screenLoading = true;
            if (mock) {
                return _success(mockData[params.actype])
            }
            $.ajax({
                type: 'post',
                url: url,
                data: params,
                success: function success(res) {
                    _this.screenLoading = false;
                    if (typeof _success === 'function') _success(res);
                },
                error: function error(res) {
                    _this.screenLoading = false;
                    if (typeof _error === 'function') _error(res);
                }
            });
        },
        btnShowfn(row, btn) {
            return btn.showfn ? btn.showfn(row) : true
        },
        selectableFn(row) {
            const selection = this.tableCfs.find(item => item.selection)
            return selection.fn && selection.fn(row)
        },
        uploadError() {
            this.$message.error('文件上传失败~');
        },
        async searchList(page) {
            if (page) {
                this.page = page
            }
            const sendP = this.formatSecrch()
            if (!sendP) {
                return
            }
            if (this.formActions.postTableType === 'dubbo') {
                this.getData(
                    this.formActions.postTableUrl,
                    {
                        actype: this.formActions.postActype,
                        sendData: JSON.stringify(sendP)
                    },
                    (res) => {
                        if (res.code === 200) {
                            this.resTable(res)
                        } else {
                            this.$message.error(res.msg);
                        }
                    },
                    function () {
                        this.$message.error('列表数据获取失败~');
                    },
                    this.formActions.postTableMock
                );
            } else {
                if (this.formActions.postTableMock) {
                    const mockData = require('./mock')
                    const res = mockData[this.formActions.postActype]
                    if (res.code === 200) {
                        this.resTable(res)
                    } else {
                        this.$message.error(res.msg);
                    }
                } else {
                    // sendP
                    const res = await this.$kop.send(this.formActions.postTableUrl, pickBy(sendP))
                    if (res.data.code === 200) {
                        this.resTable(res.data)
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }
            }
        },
        resTable(res) {
            const data = res.data && Array.isArray(res.data[this.formActions.postTableWrapField]) ? res.data[this.formActions.postTableWrapField] : res.data
            if (this.formActions.postTableField) {
                this.tableData = data.map(item => item[this.formActions.postTableField]);
            } else {
                this.tableData = data;
            }
            // 报了一层分页
            if (res.data && res.data.list && Array.isArray(res.data.list)) {
                this.total = res.data.total;
            } else {
                if (this.tableData && this.tableData.length < this.pageSize) {
                    if (this.page == 1) {
                        this.total = res.data.length;
                    } else {
                        this.total = this.page * this.pageSize;
                    }
                } else {
                    this.total = (this.page + 1) * this.pageSize;
                }
            }
        },
        formatSecrch() {
            const sendP = { ...this.formInline }
            if (this.pageAble) {
                sendP.page = this.page
                sendP.pageSize = this.pageSize
            }
            if (this.paramsArray && this.paramsArray.length) {
                this.paramsArray.forEach(item => {
                    sendP[item] = sendP[item] ? sendP[item].split(' ') : []
                })
            }
            this.timeFieldList.forEach(item => {
                const fieldSection = item.field.split('-')
                if (sendP[item.field]) {
                    if (item.result === 'timestamp') {
                        sendP[fieldSection[0]] = new Date().getTime(sendP[item.field][0])
                        sendP[fieldSection[1]] = new Date().getTime(sendP[item.field][1])
                    } else {
                        sendP[fieldSection[0]] = this.formatTime(sendP[item.field][0])
                        sendP[fieldSection[1]] = this.formatTime(sendP[item.field][1])
                    }
                }
            })
            this.formDescList.forEach(element => {
                if (element.otherField) {
                    const data = element.postList && element.postList.find(curr => curr.value == sendP[element.field])
                    sendP[element.otherField] = data ? data.label : null
                }
            })
            for (let index = 0; index < this.tableDescList.length; index++) {
                const element = this.tableDescList[index];
                if (element.requireRequest) {
                    if (!sendP[element.field]) {
                        this.$message.error(`请输入${element.name}！`)
                        return false
                    }
                }
            }
            return {
                ...sendP,
                ...this.formActions.defaultParams
            }
        },
        submitForm(btn) {
            if (btn.class === 'search') {
                this.$refs[this.formName].validate((valid) => {
                    if (valid) {
                        this.page = 1
                        this.searchList()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                return
            }
            if (btn.class === 'reset') {
                this.formDescList.forEach(element => {
                    this.$set(this.formInline, element.field, null)
                });
            }
            if (btn.class === 'download') {
                const sendP = this.formatSecrch()
                if (btn.isUser) {
                    sendP.operatorName = this.operatorName
                    sendP.operatorId = this.operatorId
                }
                if (!sendP) {
                    return
                }
                if (btn.postDownLoadType === 'dubbo') {
                    let that = this
                    this.getData(
                        btn.postDownLoadUrl,
                        {
                            actype: btn.postDownLoadActype,
                            sendData: JSON.stringify(sendP)
                        },
                        (res) => {
                            if (res.code === 200) {
                                if (btn.simple) {
                                    const originUrl = res.data.fileUrl || res.data || res.data.url
                                    if (!originUrl) {
                                        return this.$message.error('文件地址获取失败');
                                    }
                                    let ipReg = /^https:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
                                    let url = ipReg.test(originUrl) ? originUrl.replace('https', 'http') : originUrl;
                                    if (url.indexOf('https') > -1) {
                                        let aLink = document.createElement('a');
                                        aLink.target = '_blank';
                                        aLink.href = url;
                                        aLink.click();
                                    } else {
                                        window.open(`http://page.xiaojukeji.com/m/downloadPage.html?originUrl=${url}`, '_blank')
                                    }
                                } else {
                                    if (res.data) {
                                        that.$refs['exportTesk'].showDialog(btn.javaType, 1);
                                    }
                                }
                            } else {
                                this.$message.error(res.msg);
                            }
                        },
                        function () {
                            this.$message.error('导出数据失败~');
                        },
                        false
                    );
                }
                return
            }
            if (btn.class === 'interface') {
                if (btn.type === 'multipleSelection') {
                    btn['fn'](this.multipleSelection)
                } else {
                    btn['fn']()
                }
                return
            }
        },
        getParams(element) {
            let params = {}
            Object.keys(element.postParams).forEach(item => {
                // 有值默认固定
                if (element.postParams[item]) {
                    params[item] = element.postParams[item]
                } else {
                    params[item] = this.formInline[element.postRelyOn]
                }
            })
            return element.postLevel === 1 ? element.postParams : params
        },
        async getRelyOnList(desc) {
            // 先回传改变值
            desc.changeBack && desc.changeBack(this.formInline[desc.field])
            const field = desc.field
            // 校验是否可控
            await this.checkSelectShow(field)
            const selectHandleList = this.formDescList.filter(item => item.postLevel === 2 && item.postRelyOn === field)
            if (!selectHandleList.length) {
                return
            }
            await this.getSelectList(selectHandleList)
        },
        checkSelectShow(field) {
            for (let x = 0; x < this.formDescList.length; x++) {
                const element = this.formDescList[x];
                if (element.pickField && element.pickField === field) {
                    if (!this.formInline[field]) {
                        this.$set(this.formDescList, x, {
                            ...element,
                            pickShow: true,
                        })
                        this.$set(this.formDescList, x + 1, {
                            ...this.formDescList[x+1],
                            pickShow: false,
                        })
                        this.formInline[element.field] = null
                        break
                    }
                    this.formInline[element.field] = null
                    if (element.pickValue == this.formInline[field]) {
                        this.$set(this.formDescList, x, {
                            ...element,
                            pickShow: true,
                        })
                    } else {
                        this.$set(this.formDescList, x, {
                            ...element,
                            pickShow: false,
                        })
                    }
                }
            }
        },
        downloadFileMixin(originUrl) {
            if (!originUrl) {
                return this.$message.error('文件地址获取失败');
            }
            let ipReg = /^https:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
            let url = ipReg.test(originUrl) ? originUrl.replace('https', 'http') : originUrl;
            if (url.indexOf('https') > -1) {
                let aLink = document.createElement('a');
                aLink.target = '_blank';
                aLink.href = url;
                aLink.click();
            } else {
                window.open(`http://page.xiaojukeji.com/m/downloadPage.html?originUrl=${url}`, '_blank')
            }
        },
        tableFormat(item, desc) {
            if (item.timeType === 'Date') {
                return this.formatTime(desc[item.field])
            }
            if (item.type === 'select') {
                const postList1 = this.formDescList.find(x => x.field === item.field)
                const postList = postList1 && postList1['postList']
                const label = postList && postList.find(x => x.value == desc[item.field])
                return label ? label['label'] : '-'
            }
            if (item.tableType === 'select') {
                const postList = item['postList']
                const label = postList && postList.find(x => x.value == desc[item.field])
                return label ? label['label'] : '-'
            }
            if (item.timeType == 'Date-jsonField') {
                const jso = JSON.parse(desc[item.jsonField] ? desc[item.jsonField] : null)
                const resu = jso && jso[item.field] ? jso[item.field] : null
                return this.formatTime(resu)
            }
            if (item.jsonField) {
                const jso = JSON.parse(desc[item.jsonField] ? desc[item.jsonField] : null)
                return jso && jso[item.field] ? jso[item.field] : '-'
            }
            return desc[item.field] ? desc[item.field] : '-'
        },
        handleCommand(command) {
            this.formSearchBtns.forEach(item => {
                if (item.class == 'dropdown') {
                    item.btnChooseList && item.btnChooseList.forEach(crr => {
                        if (crr.command == command) {
                            crr.fn()
                        }
                    })
                }
            })
        },
        formatTime(date) {
            if (!date) {
                return '-'
            }
            return FormatTime.formatTime(date, 'yyyy-MM-dd HH:mm:ss');
        }
    }
}
</script>
<style lang="scss">
.wrapSuppliedList {
    .el-date-editor .el-range__close-icon {
        font-size: 14px;
        color: #A9A8BA;
        width: 25px;
        display: inline-block;
        float: right;
        line-height: 26px;
    }

    .el-input__suffix .el-input__suffix-inner .el-input__icon {
        line-height: 26px;
    }
}
</style>
<style lang="scss" scoped>
.suppliedApp {
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
}

.paginationWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px 20px 20px;
}

.inputWrap {
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrap-content {
    padding: 10px 0;
}

.detailTitle {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
}

.wrapTopBtn {
    display: flex;
    margin-bottom: 10px;

    .topBtnMargin {
        margin-right: 10px;
    }
}

.checkNum {
    color: red;
    font-size: 12px;
    text-align: center;
}

.bottomBtn {
    margin: 20px 0;
}

.lineBtn {
    display: inline-block;
}

.marginBody {
    box-sizing: border-box;
    background: #eef1f4;
    padding: 10px;
    padding-bottom: 20px;
}

.hide {
    display: none;
}

.btnSpan {
    cursor: pointer;
    margin: 0 5px;
}
.btnSpaCu {
    cursor: pointer;
}

.bottomBtn1 {
    margin: 0px 0 20px 0;
}

.changeTitleWrap {
    display: flex;
    align-items: baseline;

    .changeTitleWrapTitle {
        font-size: 16px;
        font-weight: bold;
        margin-right: 20px;
    }
}

.wrapSuppliedList {
    padding: 10px;
}

.wrapDialogBtns {
    display: flex;
    justify-content: end;
}

.action-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    * {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;

        &:not(:last-child):after {
            content: "";
            display: inline-block;
            width: 1px;
            height: 14px;
            background: #E9E9E9;
            margin-left: 10px;
        }
    }
}
</style>

