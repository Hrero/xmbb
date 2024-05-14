"use strict";

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function (obj) {
        return typeof obj;
      }
    : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol
          ? "symbol"
          : typeof obj;
      };
if (localStorage.getItem("didi-header-sim-cluster")) {
  let osimValue = localStorage.getItem("didi-header-sim-cluster");
  window.KOPConfig.host = "pinzhi.didichuxing.com/kop_osim";
  sessionStorage.setItem("osim-value", osimValue);
} else {
  sessionStorage.removeItem("osim-value");
}
var config = {};
var kopHostMap = {
  "page.xiaojukeji.com": "kop.qingqikeji.com",
};
var host = location.host;
if (kopHostMap[host]) config.host = kopHostMap[host];

var kop = new KUI.KOP({
  initWsgsdk: false,
  // host:'predaijiays.kuaidadi.com'
});

if (KUI.Golden) {
  window.goldenConfig = window.goldenConfig || {};
  window.golden = new KUI.Golden(window.goldenConfig);
}

window.golden.context.appKey = "omega7029762d24";

const DEFULTPAGE = localStorage.yd_pageName || "bindBike";

new Vue({
  el: "#app",
  data: function data() {
    const validatorNumber = (rule, value, callback) => {
      const reg = /^[\d]+$/;
      if (!reg.test(value)) {
        callback("数量必须大于0的整数");
      }
      if (value == 0) {
        callback("数量必须大于0");
      }
      if (value > 50000) {
        callback("数量最大不超过 50000");
      }
      callback();
    };
    const validatorEmail = (rule, value, callback) => {
      const reg = /^(?:\w+[-+.]?)\w+@(?:\w+\.)+\w+$/;
      if (!reg.test(value)) {
        callback("请输入正确的邮箱地址");
      }
      callback();
    };
    const validatorPerent = (rule, value, callback) => {
      if (value.includes("%")) {
        callback("不允许输入 %");
      }
      callback();
    };
    return {
      loading: false,
      isWeixin:
        navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
        "micromessenger",
      currentPage: DEFULTPAGE, // 当前页面
      configType: "", // 选择产线、车型、锁型页
      userInfo: {
        empName: "",
        empId: null,
        password: "",
        token: "",
      }, // 用户信息
      productLine: {
        odmConfigs: [
          {
            odmProductCode: "",
            odmProductLine: {},
          },
        ],
        storageId: 1099514632946,
        storageName: "代驾杭州城市",
      }, // 产线信息
      productLineNew: {
        odmConfigs: [
          {
            odmProductCode: "",
            odmProductLine: {},
          },
        ],
        storageId: 1099514632946,
        storageName: "代驾杭州城市",
      }, // 产线信息
      productLineOptions: [],
      productLineOptionsNew: [],
      productLineForm: {
        odmProductName: "",
        odmProductLine: "",
        odmProductCode: "",
      },
      productLineFormNew: {
        odmProductName: "",
        odmProductLine: "",
        odmProductCode: "",
      },
      bikeLockInfo: {
        bikeLockRelation: {},
        odmConfigs: [],
        bikeProperties: [],
        lockProperties: [],
        modelPark: {},
      },
      bikeLockInfoNew: {
        bikeLockRelation: {},
        odmConfigs: [],
        bikeProperties: [],
        lockProperties: [],
        modelPark: {},
      },
      lockOptions: [],
      lockOptionsNew: [],
      currentLockInfo: {
        modelCode: null,
        modelName: "",
        modelUrl: "",
        modelType: "2",
      },
      currentLockInfoNew: {
        modelCode: null,
        modelName: "",
        modelUrl: "",
        modelType: "2",
      },
      currentBikeInfo: {
        modelCode: null,
        modelName: "",
        modelUrl: "",
        modelType: "1",
      },
      currentBikeInfoNew: {
        modelCode: null,
        modelName: "",
        modelUrl: "",
        modelType: "1",
      },
      parkOptions: [],
      parkOptionsNew: [],
      bikeBindInfo: {
        codeInput: "",
        parkOptions: [],
      },
      bikeBindInfoNew: {
        codeInput: "",
        parkOptions: [],
      },
      localLogs: [],
      showBikeBindError: false,
      showBikeBindErrorText: "",
      showBikeBindErrorNew: false,
      showBikeBindErrorTextNew: "",
      allInOneList: [
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ],
      rules: {
        odmProductLine: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        odmProductCode: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      // 车码下载记录需求开始
      codeDownRecordForm: {
        categoryNo: 1,
        modelNo: "",
        supplierName: "",
        createTimeStart: "",
        createTimeEnd: "",
        pageNum: 1,
        pageSize: 20,
      },
      codeDownRecordFormCreaterTimeRange: [],
      codeDownRecordFormInputWidth: "160px",
      codeDownRecordModelOptions: [],
      codeDownRecordTableList: [],
      codeDownRecordFormTotal: 0,
      showAddCodeDownRecord: false,
      addCodeDownRecordForm: {
        categoryNo: 1,
        modelNo: null,
        downloadQuantity: null,
        supplierName: "",
        email: "",
        operator: "",
        allInOne: null,
      },
      addCodeDownRecordModelNoOptions: [],
      addCodeDownRecordFormRules: {
        modelNo: [
          {
            required: true,
            type: "number",
            message: "请选择车型",
            trigger: "blur",
          },
        ],
        downloadQuantity: [
          { required: true, message: "请输入数量", trigger: "blur" },
          { validator: validatorNumber, trigger: "blur" },
        ],
        allInOne: [
          {
            required: true,
            type: "number",
            message: "请选择是否三码合一",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validatorEmail, trigger: "blur" },
        ],
        supplierName: [
          { required: true, message: "请输入供应商", trigger: "blur" },
          { validator: validatorPerent, trigger: "blur" },
        ],
      },
      materialInfo: {},
      materialList: [],
      modelNoList: [],
      modelNoOptions: [],
      addModelNoOptions: [],
      chooseMaterialShow: false,
      // 车码下载记录需求结束
      startStyle: {
        display: "none",
      },
    };
  },
  created: function created() {
    this.startStyle = {
      display: "block",
    };
    if (localStorage.getItem("bikeBindUserInfo")) {
      this.userInfo = JSON.parse(localStorage.getItem("bikeBindUserInfo"));
    }
    if (localStorage.getItem("productLineInfo")) {
      this.productLineForm = JSON.parse(
        localStorage.getItem("productLineInfo")
      );
    }
    if (localStorage.getItem("bikeBindUserInfoNew")) {
      this.userInfo = JSON.parse(localStorage.getItem("bikeBindUserInfoNew"));
    }
    if (localStorage.getItem("productLineInfoNew")) {
      this.productLineFormNew = JSON.parse(
        localStorage.getItem("productLineInfoNew")
      );
    }
    if (this.userInfo.empName && this.userInfo.password) {
      this.login();
    } else {
      this.setPage("loginPage", "");
    }
    if (localStorage.getItem("bindLockInfo")) {
      this.currentLockInfo = JSON.parse(localStorage.getItem("bindLockInfo"));
    }
    if (localStorage.getItem("bindBikeInfo")) {
      this.currentBikeInfo = JSON.parse(localStorage.getItem("bindBikeInfo"));
    }
    if (localStorage.getItem("parkOptions")) {
      this.bikeBindInfo = {
        parkOptions: JSON.parse(localStorage.getItem("parkOptions")),
      };
    }
    if (localStorage.getItem("bindLockInfoNew")) {
      this.currentLockInfoNew = JSON.parse(
        localStorage.getItem("bindLockInfoNew")
      );
    }
    if (localStorage.getItem("bindBikeInfoNew")) {
      this.currentBikeInfoNew = JSON.parse(
        localStorage.getItem("bindBikeInfoNew")
      );
    }
    if (localStorage.getItem("parkOptionsNew")) {
      this.bikeBindInfoNew = {
        parkOptions: JSON.parse(localStorage.getItem("parkOptionsNew")),
      };
    }
    if (localStorage.getItem("materialInfo1")) {
      this.materialInfo = JSON.parse(localStorage.getItem("materialInfo1"));
    }
    if (localStorage.getItem("modelNoList")) {
      this.modelNoList = JSON.parse(localStorage.getItem("modelNoList"));
      this.modelNoOptions = this.modelNoList;
      this.addModelNoOptions = this.modelNoList;
    }
    this.queryModels();
  },
  watch: {
    productLineForm: {
      handler: function handler(obj) {
        if (obj.odmProductCode) {
          this.productLineOptions = [];
          this.productLine.odmConfigs.forEach((item) => {
            if (item.odmProductCode == obj.odmProductCode) {
              Object.keys(item.odmProductLine).forEach((l) => {
                console.log(l, "=llll");
                this.productLineOptions.push({
                  label: l,
                  value: l,
                });
              });
              this.productLineForm.odmProductName = item.odmProductName;
            }
          });
        } else {
          this.productLineForm.odmProductLine = "";
          this.productLineForm.odmProductName = "";
          this.productLineOptions = [];
        }
      },
      deep: true,
      immediate: true,
    },
    productLineFormNew: {
      handler(obj) {
        console.log(111);
        if (obj.odmProductCode) {
          this.productLineOptionsNew = [];
          this.productLineNew.odmConfigs.forEach((item) => {
            if (item.odmProductCode == obj.odmProductCode) {
              Object.keys(item.odmProductLine).forEach((l) => {
                this.productLineOptionsNew.push({
                  label: l,
                  value: l,
                });
              });
              this.productLineFormNew.odmProductName = item.odmProductName;
            }
          });
        } else {
          this.productLineFormNew.odmProductLine = "";
          this.productLineFormNew.odmProductName = "";
          this.productLineOptionsNew = [];
        }
      },
      deep: true,
      immediate: true,
    },
    bikeBindInfo: {
      handler: function handler(obj) {
        if (obj.parkOptions) {
          if (!this.isEmpty()) {
            this.handleBind();
          }
        }
      },
      deep: true,
    },
    bikeBindInfoNew: {
      handler: function handler(obj) {
        if (obj.parkOptions) {
          if (!this.isEmptyNew()) {
            this.handleBindNew(false);
          }
        }
      },
      deep: true,
    },
    currentPage: {
      handler(val) {
        console.log(val, "======");
        if (val != "loginPage") {
          localStorage.yd_pageName = val;
        }
        if (val == "bindPage") {
          if (
            !localStorage.productLineInfo ||
            !localStorage.productLineInfo.odmProductName
          ) {
            this.login();
          }
          this.$nextTick(() => {
            this.scanFocus();
          });
        }
        if (val == "bindPageNew") {
          if (
            !localStorage.productLineInfoNew ||
            !localStorage.productLineInfoNew.odmProductName
          ) {
            this.login();
          }
          this.$nextTick(() => {
            this.scanFocusNew();
          });
        }
        if (val == "codeDownRecord") {
          this.codeDownRecordOnSearch(1);
        }
      },
      immediate: true,
    },
    "codeDownRecordForm.modelNo": {
      handler(newValue) {
        if (!newValue) {
          this.codeDownRecordModelOptions = this.modelNoList;
        }
      },
    },
    "addCodeDownRecordForm.modelNo": {
      handler(newValue) {
        if (!newValue) {
          this.addCodeDownRecordModelNoOptions = this.modelNoList;
        }
      },
    },
    currentBikeInfoNew: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue, "newValue,oldValue");
        if (oldValue && oldValue.modelCode) {
          this.materialInfo = {};
          this.materialList = [];
        }
        if (newValue.modelCode) {
          this.queryMaterial(newValue.modelCode);
        }
      },
      immediate: true,
    },
  },
  methods: {
    queryModels() {
      const params = {
        categoryNo: 1,
      };
      kop.send(
        "hm.b.sm.p.queryModels",
        params,
        null,
        null,
        (data) => {
          this.modelList = data.records;
          this.modelList = this.modelList.map((i) => {
            const obj = {
              no: Number(i.no),
              displayName: i.displayName,
            };
            return obj;
          });
          this.codeDownRecordModelOptions = this.modelList;
          this.addCodeDownRecordModelNoOptions = this.modelList;
        },
        (err, msg) => {
          this.toast(msg);
        }
      );
    },
    chooseMaterial(item) {
      this.materialInfo = item;
      localStorage.setItem("materialInfo1", JSON.stringify(this.materialInfo));
      this.chooseMaterialShow = false;
    },
    queryMaterial(modelCode) {
      this.loading = true;
      const params = {
        modelNo: modelCode,
      };
      kop.send(
        "hm.p.bike.code.query.material",
        params,
        null,
        null,
        (data) => {
          this.loading = false;
          this.materialList = data;
        },
        (err, msg) => {
          this.materialList = [];
          this.toast(msg);
        }
      );
    },
    addCodeDownRecordModelNoFilterMethod(keyword) {
      if (keyword == "") {
        this.addCodeDownRecordModelNoOptions = this.modelList;
      } else {
        this.addCodeDownRecordModelNoOptions = this.modelList.filter((item) => {
          return item.displayName.indexOf(keyword) !== -1;
        });
      }
    },
    codeDownRecordFormTotalHandleChangeCurrentPage(pageNum) {
      this.codeDownRecordForm.pageNum = pageNum;
      this.codeDownRecordOnSearch();
    },
    codeDownRecordModelNoFilterMethod(keyword) {
      if (keyword == "") {
        this.codeDownRecordModelOptions = this.modelList;
      } else {
        this.codeDownRecordModelOptions = this.modelList.filter((item) => {
          return item.displayName.indexOf(keyword) !== -1;
        });
      }
    },
    codeDownRecordOnSearch(pageNum) {
      this.loading = true;
      this.codeDownRecordForm.createTimeStart =
        (this.codeDownRecordFormCreaterTimeRange[0] &&
          this.codeDownRecordFormCreaterTimeRange[0].getTime()) ||
        "";
      this.codeDownRecordForm.createTimeEnd =
        (this.codeDownRecordFormCreaterTimeRange[1] &&
          this.codeDownRecordFormCreaterTimeRange[1].getTime()) ||
        "";
      this.codeDownRecordForm.pageNum =
        pageNum || this.codeDownRecordForm.pageNum;
      const params = this.codeDownRecordForm;
      kop.send(
        "hm.p.code.deduction.query",
        params,
        null,
        null,
        (data) => {
          this.loading = false;
          this.codeDownRecordTableList = data;
          if (
            this.codeDownRecordTableList.length <
            this.codeDownRecordForm.pageSize
          ) {
            this.codeDownRecordFormTotal =
              this.codeDownRecordForm.pageNum *
              this.codeDownRecordForm.pageSize;
          } else {
            this.codeDownRecordFormTotal =
              (this.codeDownRecordForm.pageNum + 1) * this.pageSize;
          }
        },
        (err, msg) => {
          this.toast(msg);
        }
      );
    },
    codeDownRecordOnDownload() {
      this.showAddCodeDownRecord = true;
      const params = {
        categoryNo: 1,
      };
      kop.send(
        "hm.b.sm.p.queryModels",
        params,
        null,
        null,
        (data) => {
          this.modelList = data.records;
          this.modelList = this.modelList.map((i) => {
            const obj = {
              no: Number(i.no),
              displayName: i.displayName,
            };
            return obj;
          });
          this.codeDownRecordModelOptions = this.modelList;
          this.addCodeDownRecordModelNoOptions = this.modelList;
        },
        (err, msg) => {
          this.toast(msg);
        }
      );
    },
    addCodeDownRecordFormConfirm() {
      this.$refs.addCodeDownRecordForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const { empName = "" } = this.userInfo;
          this.addCodeDownRecordForm.operator = empName;
          kop.send(
            "hm.p.code.download",
            this.addCodeDownRecordForm,
            null,
            null,
            (data) => {
              this.loading = false;
              this.showAddCodeDownRecord = false;
              this.resetAddCodeDownRecordForm();
              this.codeDownRecordOnSearch();
            },
            (err, msg) => {
              this.toast(msg);
            }
          );
        }
      });
    },
    resetAddCodeDownRecordForm() {
      this.addCodeDownRecordForm = {
        categoryNo: 1,
        modelNo: null,
        downloadQuantity: null,
        addCodeDownRecordForm: null,
        supplierName: "",
        email: "",
        operator: "",
      };
    },
    toast(msg, cb) {
      this.loading = false;
      KUI.Dialog.tinyToast(msg, {
        time: 6000,
        onConfirm: function () {
          if (typeof cb === "function") cb();
        },
      });
    },
    setPage(configPage, chooseProductionline) {
      this.currentPage = configPage;
      this.configType = chooseProductionline;
    },
    login() {
      if (this.userInfo.empName && this.userInfo.password) {
        kop.send(
          "ph.b.factoryLogin",
          {
            empName: this.userInfo.empName,
            password: this.userInfo.password,
            bizType: 2,
          },
          null,
          null,
          (data) => {
            this.loading = false;
            this.userInfo = {
              empName: this.userInfo.empName,
              password: this.userInfo.password,
              token: data.token,
              empId: data.empId,
              role: data.role,
              newMode: data.newMode,
            };
            if (
              this.currentPage === "bindPage" ||
              this.currentPage === "loginPage" ||
              this.currentPage === "configPage"
            ) {
              this.productLine = {
                odmConfigs: data.odmConfigs ? data.odmConfigs : [],
                storageId: data.storageId ? data.storageId : "",
                storageName: data.storageName ? data.storageName : "",
              };
              localStorage.setItem(
                "bikeBindUserInfo",
                JSON.stringify(this.userInfo)
              );
              if (
                this.productLineForm.odmProductLine &&
                this.productLineForm.odmProductCode &&
                this.currentLockInfo.modelCode &&
                this.currentBikeInfo.modelCode
              ) {
                this.setPage("bindPage", "");
                this.scanFocus();
                this.getModelConfig(
                  this.productLineForm.odmProductLine,
                  this.productLineForm.odmProductCode,
                  false
                );
              } else {
                this.setPage("configPage", "chooseProductionline");
              }
            } else if (
              this.currentPage === "bindPageNew" ||
              this.currentPage === "configPageNew"
            ) {
              this.productLineNew = {
                odmConfigs: data.odmConfigs ? data.odmConfigs : [],
                storageId: data.storageId ? data.storageId : "",
                storageName: data.storageName ? data.storageName : "",
              };
              localStorage.setItem(
                "bikeBindUserInfo",
                JSON.stringify(this.userInfo)
              );
              localStorage.setItem(
                "bikeBindUserInfoNew",
                JSON.stringify(this.userInfo)
              );
              if (
                this.productLineFormNew.odmProductLine &&
                this.productLineFormNew.odmProductCode &&
                this.currentBikeInfoNew.modelCode
              ) {
                this.setPage("bindPageNew", "");
                this.scanFocusNew();
                this.getModelConfigNew(
                  this.productLineFormNew.odmProductLine,
                  this.productLineFormNew.odmProductCode,
                  false
                );
              } else {
                this.setPage("configPageNew", "chooseProductionlineNew");
              }
            }
          },
          (err, msg) => {
            this.loading = false;
            this.toast(msg);
            this.userInfo = {
              empName: "",
              password: "",
              empId: null,
              token: "",
            };
            localStorage.removeItem("bikeBindUserInfo");
            localStorage.removeItem("bikeBindUserInfoNew");
          }
        );
      }
    },
    logout() {
      var self = this;
      kop.send(
        "bh.b.o.logout",
        {
          opEmpId: this.userInfo.empId,
          opToken: this.userInfo.token,
        },
        null,
        null,
        function (data) {
          self.resetInfo();
          self.setPage("loginPage", "");
        },
        function (err, msg) {
          this.toast(msg);
        }
      );
    },
    getModelConfig(odmProductLine, odmProductCode, openConfig = true) {
      this.loading = true;
      kop.send(
        "htw.b.modelConfig",
        {
          opToken: this.userInfo.token,
          bizType: 2,
          empId: this.userInfo.empId,
          // "storageId": this.productLine.storageId,
          odmProductLine: odmProductLine,
          odmProductCode: odmProductCode,
        },
        null,
        null,
        (data) => {
          this.loading = false;
          const {
            bikeLockRelation = [],
            bikeParkRelation = [],
            bikeProperties = [],
            lockProperties = [],
          } = data;
          this.modelNoList = bikeProperties;
          this.modelNoOptions = bikeProperties;
          this.addModelNoOptions = bikeProperties;
          localStorage.setItem("modelNoList", JSON.stringify(this.modelNoList));
          this.bikeLockInfo = JSON.parse(JSON.stringify(data));
          if (openConfig) this.setPage("configPage", "chooseBike");
        },
        (err, msg) => {
          this.loading = false;
          this.toast(msg);
        }
      );
    },
    getModelConfigNew(odmProductLine, odmProductCode, openConfig = true) {
      this.loading = true;
      console.log(this.currentPage, "this.currentPage");
      if (
        this.currentPage == "bindPageNew" ||
        this.currentPage == "configPageNew"
      ) {
        kop.send(
          "hm.p.model.query",
          {
            opToken: this.userInfo.token,
            categoryNo: 1,
            empId: this.userInfo.empId,
            odmProductLine: odmProductLine,
            odmProductCode: odmProductCode,
          },
          null,
          null,
          (data) => {
            this.loading = false;
            this.modelNoList = data;
            this.modelNoOptions = data;
            this.addModelNoOptions = data;
            localStorage.setItem(
              "modelNoList",
              JSON.stringify(this.modelNoList)
            );
            this.bikeLockInfoNew = JSON.parse(
              JSON.stringify({
                bikeProperties: data,
              })
            );
            if (openConfig) this.setPage("configPageNew", "chooseBikeNew");
          },
          (err, msg) => {
            this.loading = false;
            this.toast(msg);
          }
        );
      } else {
        kop.send(
          "htw.b.modelConfig",
          {
            opToken: this.userInfo.token,
            bizType: 2,
            empId: this.userInfo.empId,
            // "storageId": this.productLine.storageId,
            odmProductLine: odmProductLine,
            odmProductCode: odmProductCode,
          },
          null,
          null,
          (data) => {
            this.loading = false;
            const {
              bikeLockRelation = [],
              bikeParkRelation = [],
              bikeProperties = [],
              lockProperties = [],
            } = data;
            this.modelNoList = bikeProperties;
            this.modelNoOptions = bikeProperties;
            this.addModelNoOptions = bikeProperties;
            localStorage.setItem(
              "modelNoList",
              JSON.stringify(this.modelNoList)
            );
            this.bikeLockInfoNew = JSON.parse(JSON.stringify(data));
            if (openConfig) this.setPage("configPageNew", "chooseBikeNew");
          },
          (err, msg) => {
            this.loading = false;
            this.toast(msg);
          }
        );
      }
    },
    submitProductionlineNew() {
      this.$refs["productLineFormNew"].validate((valid) => {
        if (valid) {
          localStorage.setItem(
            "productLineInfoNew",
            JSON.stringify(this.productLineFormNew)
          );
          this.getModelConfigNew(
            this.productLineFormNew.odmProductLine,
            this.productLineFormNew.odmProductCode
          );
        }
      });
    },
    chooseBikeTypeNew(bike) {
      let locks = [];
      this.loading = true;
      if (
        this.currentPage == "bindPageNew" ||
        this.currentPage == "configPageNew"
      ) {
        kop.send(
          "htw.p.l.model.selective",
          {
            opToken: this.userInfo.token,
            bikeModelNo: bike.modelCode,
            categoryNo: 1,
            empId: this.userInfo.empId,
          },
          null,
          null,
          (data) => {
            this.currentBikeInfoNew = JSON.parse(JSON.stringify(bike));
            localStorage.setItem(
              "bindBikeInfoNew",
              JSON.stringify(this.currentBikeInfoNew)
            );
            this.loading = false;
            this.lockOptionsNew = data;
            this.currentLockInfoNew = {};
            localStorage.setItem(
              "bindLockInfoNew",
              JSON.stringify(this.currentLockInfoNew)
            );
            localStorage.setItem("materialInfo1", JSON.stringify({}));
            this.setPage("configPageNew", "chooseLockNew");
          },
          (err, msg) => {
            this.loading = false;
            this.toast(msg);
          }
        );
      } else {
        this.currentBikeInfoNew = JSON.parse(JSON.stringify(bike));
        localStorage.setItem(
          "bindBikeInfoNew",
          JSON.stringify(this.currentBikeInfoNew)
        );
        this.bikeLockInfoNew.bikeLockRelation.forEach((key) => {
          if (key.bikeTypeNo == bike.modelCode) {
            locks = key.lockTypeNos;
          }
        });
        this.lockOptionsNew = [];
        this.bikeLockInfoNew.lockProperties.forEach((l) => {
          locks.forEach((item) => {
            if (l.modelCode == item) {
              this.lockOptionsNew.push(l);
            }
          });
        });
        this.loading = false;
        this.currentLockInfoNew = {};
        localStorage.setItem(
          "bindLockInfoNew",
          JSON.stringify(this.currentLockInfoNew)
        );
        localStorage.setItem("materialInfo1", JSON.stringify({}));
        this.setPage("configPageNew", "chooseLockNew");
      }
    },
    chooseLockTypeNew(lock) {
      this.currentLockInfoNew = JSON.parse(JSON.stringify(lock));
      localStorage.setItem(
        "bindLockInfoNew",
        JSON.stringify(this.currentLockInfoNew)
      );
      this.chooseModelParkNew();
      this.setPage("bindPageNew", "");
      this.chooseMaterialShow = true;
      this.scanFocusNew();
    },
    chooseModelParkNew() {
      let key =
        this.currentBikeInfoNew.modelCode +
        "_" +
        this.currentLockInfoNew.modelCode;
      this.parkOptionsNew = [];
      if (
        this.currentPage == "configPageNew" ||
        this.currentPage === "bindPageNew"
      ) {
        kop.send(
          "hm.p.part.rule.query",
          {
            opToken: this.userInfo.token,
            modelNo: this.currentBikeInfoNew.modelCode,
            categoryNo: 1,
            empId: this.userInfo.empId,
          },
          null,
          null,
          (data) => {
            this.loading = false;
            this.parkOptions = data;
            this.bikeBindInfoNew = {
              parkOptions: this.parkOptions,
            };
            localStorage.setItem(
              "parkOptionsNew",
              JSON.stringify(this.bikeBindInfoNew.parkOptions)
            );
          },
          (err, msg) => {
            this.loading = false;
            this.toast(msg);
          }
        );
      } else {
        this.bikeLockInfoNew.bikeParkRelation.forEach((item) => {
          if (item.modelType == key) {
            this.parkOptions = item.modelParks.map((item) => {
              return {
                codeKey: item.codeKey,
                codeName: item.codeName,
                codeRule: item.codeRule,
                codeSwitch: item.codeSwitch,
                value: "",
              };
            });
          }
        });
        this.bikeBindInfoNew = {
          parkOptions: this.parkOptions,
        };
        localStorage.setItem(
          "parkOptionsNew",
          JSON.stringify(this.bikeBindInfoNew.parkOptions)
        );
      }
    },
    changeProductLineNew() {
      this.showBikeBindErrorNew = false;
      this.productLineFormNew.odmProductCode =
        this.productLineFormNew.odmProductCode;
      this.setPage("configPageNew", "chooseProductionlineNew");
    },
    changeBikeNew() {
      this.showBikeBindErrorNew = false;
      this.setPage("configPageNew", "chooseBikeNew");
    },
    submitProductionline() {
      this.$refs["productLineForm"].validate((valid) => {
        if (valid) {
          localStorage.setItem(
            "productLineInfo",
            JSON.stringify(this.productLineForm)
          );
          this.getModelConfig(
            this.productLineForm.odmProductLine,
            this.productLineForm.odmProductCode
          );
        }
      });
    },
    resetInfo() {
      localStorage.removeItem("bikeBindUserInfo");
      localStorage.removeItem("productLineInfo");
      localStorage.removeItem("bindLockInfo");
      localStorage.removeItem("bindBikeInfo");
      localStorage.removeItem("parkOptions");
      localStorage.removeItem("productLineOptions");
      (this.userInfo = {
        empName: "",
        empId: null,
        password: "",
        token: "",
      }),
        (this.productLineOptions = []),
        (this.productLineForm = {
          odmProductName: "",
          odmProductLine: "",
          odmProductCode: "",
        }),
        (this.productLine = {
          odmConfigs: [],
          storageId: null,
          storageName: "",
        }),
        (this.bikeLockInfo = {
          bikeLockRelation: {},
          odmConfigs: [],
          bikeProperties: [],
          lockProperties: [],
          modelPark: {},
        }),
        (this.lockOptions = []),
        (this.currentLockInfo = {
          modelCode: null,
          modelName: "",
          modelUrl: "",
          modelType: "2",
        }),
        (this.currentBikeInfo = {
          modelCode: null,
          modelName: "",
          modelUrl: "",
          modelType: "1",
        }),
        (this.localLogs = []);
    },
    chooseBikeType(bike) {
      this.currentBikeInfo = JSON.parse(JSON.stringify(bike));
      localStorage.setItem(
        "bindBikeInfo",
        JSON.stringify(this.currentBikeInfo)
      );
      let locks = [];
      this.loading = true;
      this.bikeLockInfo.bikeLockRelation.forEach((key) => {
        if (key.bikeTypeNo == bike.modelCode) {
          locks = key.lockTypeNos;
        }
      });
      this.lockOptions = [];
      this.bikeLockInfo.lockProperties.forEach((l) => {
        locks.forEach((item) => {
          if (l.modelCode == item) {
            this.lockOptions.push(l);
          }
        });
      });
      this.loading = false;
      this.setPage("configPage", "chooseLock");
    },
    chooseLockType(lock) {
      this.currentLockInfo = JSON.parse(JSON.stringify(lock));
      localStorage.setItem(
        "bindLockInfo",
        JSON.stringify(this.currentLockInfo)
      );
      this.chooseModelPark();
      this.setPage("bindPage", "");
      this.scanFocus();
    },
    chooseModelPark() {
      let key =
        this.currentBikeInfo.modelCode + "_" + this.currentLockInfo.modelCode;
      this.parkOptions = [];
      this.bikeLockInfo.bikeParkRelation.forEach((item) => {
        if (item.modelType == key) {
          this.parkOptions = item.modelParks.map((item) => {
            return {
              codeKey: item.codeKey,
              codeName: item.codeName,
              codeRule: item.codeRule,
              codeSwitch: item.codeSwitch,
              value: "",
            };
          });
        }
      });
      this.bikeBindInfo = {
        parkOptions: this.parkOptions,
      };
      localStorage.setItem(
        "parkOptions",
        JSON.stringify(this.bikeBindInfo.parkOptions)
      );
    },
    changeProductLine() {
      this.showBikeBindError = false;
      this.productLineForm.odmProductCode = this.productLineForm.odmProductCode;
      this.setPage("configPage", "chooseProductionline");
    },
    changeBike() {
      this.showBikeBindError = false;
      this.setPage("configPage", "chooseBike");
    },
    handleBind() {
      let empty = this.isEmpty();
      if (empty) {
        this.toast("绑码不全");
        return;
      }
      let req = {
        opToken: this.userInfo.token,
        bikeModelNo: this.currentBikeInfo.modelCode,
        opEmpId: this.userInfo.empId,
        lockModelNo: this.currentLockInfo.modelCode,
        odmProductCode: this.productLineForm.odmProductCode,
        odmProductLine: this.productLineForm.odmProductLine,
      };
      this.bikeBindInfo.parkOptions.forEach((item) => {
        req[item.codeKey] = item.value;
      });
      this.loading = true;
      kop.send(
        "ph.b.ht.bikeBind",
        req,
        null,
        null,
        (data) => {
          this.loading = false;
          this.resetInputInfo();
          this.toast("绑定成功");
          this.successAudio();
        },
        (err, msg) => {
          // 上传错误
          this.showBikeBindError = true;
          this.showBikeBindErrorText = `错误：${msg},time:${new Date().toLocaleString()}`;
          this.loading = false;
          this.errorAudio();
          this.resetInputInfo();
        }
      );
    },
    handleBindNew(sign) {
      let empty = this.isEmptyNew();
      if (empty) {
        this.toast("绑码不全");
        return;
      }
      if (sign && !this.materialInfo.materialNo) {
        this.toast("请选择物料");
        return;
      }
      if (!this.materialInfo.materialNo) {
        return;
      }
      let req = {
        opToken: this.userInfo.token,
        bikeModelNo: this.currentBikeInfoNew.modelCode,
        opEmpId: this.userInfo.empId,
        lockModelNo: this.currentLockInfoNew.modelCode,
        odmProductCode: this.productLineFormNew.odmProductCode,
        odmProductLine: this.productLineFormNew.odmProductLine,
        materialNo: this.materialInfo.materialNo || "",
      };
      this.bikeBindInfoNew.parkOptions.forEach((item) => {
        req[item.codeKey] = item.value;
      });
      this.loading = true;
      kop.send(
        "hm.b.ht.bikeBind.ma",
        req,
        null,
        null,
        (data) => {
          this.loading = false;
          this.resetInputInfoNew();
          this.toast("绑定成功");
          this.successAudio();
        },
        (err, msg) => {
          // 上传错误
          this.showBikeBindErrorNew = true;
          this.showBikeBindErrorTextNew = `错误：${msg},time:${new Date().toLocaleString()}`;
          this.loading = false;
          this.errorAudio();
          this.resetInputInfoNew();
        }
      );
    },
    bikeInfoInputEnter() {
      let code = this.bikeBindInfo.codeInput.trim().toString();
      this.showBikeBindError = false;
      if (code == "resetInfo") {
        this.resetInputInfo();
        return;
      }
      if (!this.productLineForm.odmProductCode) {
        this.toast("请选择厂区");
        this.resetInputInfo();
        return;
      }
      if (!this.productLineForm.odmProductLine) {
        this.toast("请选择产线");
        this.resetInputInfo();
        return;
      }
      if (!this.currentLockInfo.modelCode || !this.currentBikeInfo.modelCode) {
        this.toast("请选择车型或者锁型");
        this.resetInputInfo();
        return;
      }
      this.bikeBindInfo.codeInput = "";
      if (!code) return;
      const result = this.testCode(code);
      if (!result) {
        this.showBikeBindError = true;
        this.showBikeBindErrorText = `编码有误！错误编码：${code}`;
        this.loading = false;
        this.errorAudio();
        window.golden.trackEvent("qj_bikeproducetool_errorshow_sw", {
          error_type: `编码有误！错误编码：${code}`,
          vehicle_model_no: this.currentBikeInfo.modelName,
          lock_model_no: this.currentLockInfo.modelName,
        });
      }
    },
    bikeInfoInputEnterNew() {
      let code = this.bikeBindInfoNew.codeInput.trim().toString();
      this.showBikeBindErrorNew = false;
      if (code == "resetInfo") {
        this.resetInputInfoNew();
        return;
      }
      if (!this.productLineFormNew.odmProductCode) {
        this.toast("请选择厂区");
        this.resetInputInfoNew();
        return;
      }
      if (!this.productLineFormNew.odmProductLine) {
        this.toast("请选择产线");
        this.resetInputInfoNew();
        return;
      }
      if (
        !this.currentLockInfoNew.modelCode ||
        !this.currentBikeInfoNew.modelCode
      ) {
        this.toast("请选择车型或者锁型");
        this.resetInputInfoNew();
        return;
      }
      this.bikeBindInfoNew.codeInput = "";
      if (!code) return;
      const result = this.testCodeNew(code);
      if (!result) {
        this.showBikeBindErrorNew = true;
        this.showBikeBindErrorTextNew = `编码有误！错误编码：${code}`;
        this.loading = false;
        this.errorAudio();
        window.golden.trackEvent("qj_bikeproducetool_errorshow_sw", {
          error_type: `编码有误！错误编码：${code}`,
          vehicle_model_no: this.currentBikeInfoNew.modelName,
          lock_model_no: this.currentLockInfoNew.modelName,
        });
      }
    },
    resetInputInfo() {
      this.bikeBindInfo.codeInput = "";
      this.bikeBindInfo.parkOptions = this.bikeBindInfo.parkOptions.map(
        (item) => {
          return {
            codeKey: item.codeKey,
            codeName: item.codeName,
            codeRule: item.codeRule,
            codeSwitch: item.codeSwitch,
            value: "",
          };
        }
      );
    },
    resetInputInfoNew() {
      this.bikeBindInfoNew.codeInput = "";
      this.bikeBindInfoNew.parkOptions = this.bikeBindInfoNew.parkOptions.map(
        (item) => {
          return {
            codeKey: item.codeKey,
            codeName: item.codeName,
            codeRule: item.codeRule,
            codeSwitch: item.codeSwitch,
            value: "",
          };
        }
      );
    },
    testCode(code) {
      let isTrue = false;
      this.bikeBindInfo.parkOptions.forEach((item) => {
        const reg = new RegExp(item.codeRule);
        if (reg.test(code) && !item.value) {
          let result = this.bindBeforeCheckPart(item, code);
          isTrue = true;
        }
      });
      return isTrue;
    },
    testCodeNew(code) {
      let isTrue = false;
      console.log(this.bikeBindInfoNew.parkOptions);
      this.bikeBindInfoNew.parkOptions.forEach((item) => {
        const reg = new RegExp(item.codeRule);
        if (reg.test(code)) {
          let result = this.bindBeforeCheckPartNew(item, code);
          isTrue = true;
        }
      });
      return isTrue;
    },
    bindBeforeCheckPart(item, code) {
      new Promise((resolve, reject) => {
        const self = this;
        this.loading = true;
        kop.send(
          "htw.p.checkPart",
          {
            codeKey: item.codeKey,
            codeValue: code,
            vehicleModelNo: this.currentBikeInfo.modelCode,
            lockModelNo: this.currentLockInfo.modelCode,
          },
          null,
          null,
          (data) => {
            this.loading = false;
            item.value = code;
          },
          (err, msg) => {
            this.loading = false;
            this.showBikeBindError = true;
            this.showBikeBindErrorText = `${msg}`;
            window.golden.trackEvent("qj_bikeproducetool_errorshow_sw", {
              error_type: msg,
              vehicle_model_no: this.currentBikeInfo.modelName,
              lock_model_no: this.currentLockInfo.modelName,
            });
          }
        );
      });
    },
    bindBeforeCheckPartNew(item, code) {
      new Promise((resolve, reject) => {
        const self = this;
        this.loading = true;
        kop.send(
          "htw.p.checkPart.new",
          {
            codeKey: item.codeKey,
            codeValue: code,
            vehicleModelNo: this.currentBikeInfoNew.modelCode,
            lockModelNo: this.currentLockInfoNew.modelCode,
          },
          null,
          null,
          (data) => {
            this.loading = false;
            item.value = code;
          },
          (err, msg) => {
            this.loading = false;
            this.showBikeBindErrorNew = true;
            this.showBikeBindErrorTextNew = `${msg}`;
            window.golden.trackEvent("qj_bikeproducetool_errorshow_sw", {
              error_type: msg,
              vehicle_model_no: this.currentBikeInfoNew.modelName,
              lock_model_no: this.currentLockInfoNew.modelName,
            });
          }
        );
      });
    },
    scanFocus() {
      setTimeout(function () {
        if (document.getElementById("inputFocus")) {
          document.getElementById("inputFocus").focus();
        }
      }, 500);
    },
    scanFocusNew() {
      setTimeout(function () {
        if (document.getElementById("inputFocusNew")) {
          document.getElementById("inputFocusNew").focus();
        }
      }, 500);
    },
    isEmpty() {
      let empty = true; // true 绑码不全  false
      if (this.bikeBindInfo.parkOptions.length > 0) {
        return (empty = this.bikeBindInfo.parkOptions.some((item) => {
          return item.value == "";
        }));
      } else {
        return empty;
      }
    },
    isEmptyNew() {
      let empty = true; // true 绑码不全  false
      if (this.bikeBindInfoNew.parkOptions.length > 0) {
        return (empty = this.bikeBindInfoNew.parkOptions.some((item) => {
          return !item.value;
        }));
      } else {
        return empty;
      }
    },
    cancleChooseProduct() {
      this.setPage("bindPage", "");
    },
    cancleChooseProductNew() {
      this.setPage("bindPageNew", "");
    },
    errorAudio() {
      document.querySelector(".audio").play();
    },
    successAudio() {
      document.querySelector(".successAudio").play();
    },
    pushError(err, msg, title) {
      this.errorAudio();
      this.toast(msg);
      this.localLogs.unshift({
        key: Date.now(),
        text: `${title}： ${msg}，错误码：${err} ${new Date().toLocaleString()}`,
      });
    },
    scanQRCode: function scanQRCode() {
      var self = this;
      this.wxScanQRCode()
        .then(function (code) {
          let str = code.replace("CODE_128,", "");
          if (str.includes(",")) {
            str = str.split(",")[1];
          }
          self.bikeBindInfo.codeInput = str;
          self.bikeInfoInputEnter();
        })
        .catch(function (err) {
          this.toast(err);
        });
    },
    scanQRCodeNew: function scanQRCode() {
      var self = this;
      this.wxScanQRCode()
        .then(function (code) {
          let str = code.replace("CODE_128,", "");
          if (str.includes(",")) {
            str = str.split(",")[1];
          }
          self.bikeBindInfoNew.codeInput = str;
          self.bikeInfoInputEnterNew();
        })
        .catch(function (err) {
          this.toast(err);
        });
    },
    wxScanQRCode: function wxScanQRCode() {
      return new Promise(function (resolve, reject) {
        D.wx(function (err, wx) {
          wx.scanQRCode({
            desc: "scanQRCode desc",
            needResult: 1,
            scanType: ["qrCode", "barCode"],
            success: function success(res) {
              resolve(res.resultStr);
            },
          });
        });
      });
    },
  },
});
