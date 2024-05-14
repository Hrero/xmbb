const formActions = {
  formType: 'formTable',
  formSearchName: "formSearchName", // 表单名
  postTableUrl: "/didibike/misassets/generateAllocationTransferPath.node", // 表格请求地址
  postActype: "listTransferPath", // 表格请求type
  postTableType: "dubbo", // 表格请求类型
  postTableField: "", // 表格返回值嵌套字段
  pageAbleInner: true, // 表格分页配置
  pageAble: true, // 表格分页开关
  postTableMock: false, // 表格mock数据
  lock: false, // 表格请求锁
  formSearchBtns: [
    {
      name: "查询",
      class: "search",
      type: "primary",
    },
    {
      name: "重置",
      class: "reset",
      type: "",
    },
    {
      name: "上传调拨需求",
      class: "interface",
      type: "",
      fn: () => {
        let label = "生成调拨计划";
        let url = `/didibike/misassets/generateAllocationPlan.node`;
        window.top.postMessage(JSON.stringify({ url: url, label: label }), "*");
      },
    },
  ],
  tableTopBtn: [
    {
      name: "同意",
      type: "primary",
      fn: (valList) => {
        this.$confirm("是否确认同意并生成调拨计划？", "调拨建议", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.getData(
              "/didibike/misassets/generateAllocationTransferPath.node",
              {
                actype: "batchApprove",
                sendData: JSON.stringify({
                  pathNos: valList.map((item) => item.pathNo),
                  status: 1,
                  operatorId: window.THISPAGEDATA.operatorId,
                  operatorName: window.THISPAGEDATA.userName,
                }),
              },
              (res) => {
                if (res.code !== 200) {
                  this.$message.error(res.msg || "操作失败");
                } else {
                  callback && callback();
                  this.$message({ type: "success", message: res.msg });
                }
              },
              function () {
                this.$message.error(err.message || err.msg || "操作失败");
              }
            );
          })
          .catch((err) => console.log(err));
      },
    },
    {
      name: "拒绝",
      fn: (valList) => {
        this.$confirm("是否确认拒绝已生成的路径？", "调拨建议", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.getData(
              "/didibike/misassets/generateAllocationTransferPath.node",
              {
                actype: "batchApprove",
                sendData: JSON.stringify({
                  pathNos: valList.map((item) => item.pathNo),
                  status: 2,
                  operatorId: window.THISPAGEDATA.operatorId,
                  operatorName: window.THISPAGEDATA.userName,
                }),
              },
              (res) => {
                if (res.code !== 200) {
                  this.$message.error(res.msg || "操作失败");
                } else {
                  callback && callback();
                  this.$message({ type: "success", message: res.msg });
                }
              },
              function () {
                this.$message.error(err.message || err.msg || "操作失败");
              }
            );
          })
          .catch((err) => console.log(err));
      },
    },
  ],
  tableCfs: [
    {
      name: "",
      showField: "status",
      selection: true, // 是否可选
      fn: (data) => { // 是否禁用
        return data.status === 0 ? true : false;
      },
    },
    {
      name: "路径编号",
      tableIndex: 1, // 表格排序
      field: "pathNo",
    },
    {
      name: "资产类型",
      postLevel: 1, // 1级筛选
      postUrl: "hm.meta.category.query",
      postClass: "kop",
      tableColShow: false,
      postActype: "",
      postParams: { level: 1 }, // 有默认值固定
      postList: [],
      search: true,
      type: "select",
      field: "categoryNo",
    },
    {
      name: "资产类型",
      field: "categoryName",
    },
    {
      name: "型号",
      field: "modelName",
    },
    {
      name: "型号",
      search: true,
      tableColShow: false,
      postLevel: 2, // 2级筛选
      postUrl: "hm.meta.model.query",
      postClass: "kop",
      othersUrl: "hm.meta.ba.cate.models",
      othersValue: 6,
      postActype: "",
      postRelyOn: "categoryNo", // 依赖a
      postParams: {  // 有默认值固定，需携带所有参数
        categoryNo: null,
      },
      postList: [],
      type: "select",
      field: "modelNo",
    },
    {
      name: "生成时间",
      search: true,
      width: "280px",
      tableColShow: false,
      type: "daterange",
      result: "timestamp",
      field: "generationTimeStart-generationTimeEnd",
    },
    {
      name: "生成时间",
      timeType: "Date",
      field: "generationTime",
    },
    {
      name: "调拨数量",
      field: "transferQuantity",
    },
    {
      name: "调出城市",
      field: "fromCityName",
    },
    {
      name: "调出区域",
      field: "fromCityExtName",
    },
    {
      name: "调入城市",
      field: "toCityName",
    },
    {
      name: "调入区域",
      field: "toCityExtName",
    },
    {
      name: "生成方式",
      field: "generationTypeDesc",
    },
    {
      name: "审批人",
      field: "approverName",
    },
    {
      name: "审批时间",
      timeType: "Date",
      field: "approverTime",
    },
    {
      name: "状态",
      search: true,
      tableColShow: true,
      postLevel: 1,
      postUrl: "/didibike/misassets/generateAllocationTransferPath.node",
      postClass: "dubbo",
      postParams: {},
      postActype: "queryStatusInfo",
      postList: [],
      postVL: ["status", "statusDesc"], // 等同于value和label
      type: "select",
      field: "status",
    },
    {
      name: "操作",
      width: "230",
      showFn: (data) => {
        return true
        // return data.status === 0 ? true : false;
      },
      operation: [
        {
          name: "同意",
          showfn: (data) => {
            return data.status !== 0 ? false : true;
          },
          fn: (data, callback) => {
            this.$confirm("是否确认同意并生成调拨计划？", "调拨建议", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.getData(
                  "/didibike/misassets/generateAllocationTransferPath.node",
                  {
                    actype: "approve",
                    sendData: JSON.stringify({
                      pathNo: data.pathNo,
                      status: 1,
                      operatorId: window.THISPAGEDATA.operatorId,
                      operatorName: window.THISPAGEDATA.userName,
                    }),
                  },
                  (res) => {
                    if (res.code !== 200) {
                      this.$message.error(res.msg || "操作失败");
                    } else {
                      callback && callback();
                      this.$message({ type: "success", message: res.msg });
                    }
                  },
                  function () {
                    this.$message.error(err.message || err.msg || "操作失败");
                  }
                );
              })
              .catch((err) => console.log(err));
          },
        },
        {
          name: "拒绝",
          showfn: (data) => {
            return data.status !== 0 ? false : true;
          },
          fn: (data, callback) => {
            this.$confirm("是否确认拒绝已生成的路径？", "调拨建议", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.getData(
                  "/didibike/misassets/generateAllocationTransferPath.node",
                  {
                    actype: "approve",
                    sendData: JSON.stringify({
                      pathNo: data.pathNo,
                      status: 2,
                      operatorId: window.THISPAGEDATA.operatorId,
                      operatorName: window.THISPAGEDATA.userName,
                    }),
                  },
                  (res) => {
                    if (res.code !== 200) {
                      this.$message.error(res.msg || "操作失败");
                    } else {
                      callback && callback();
                      this.$message({ type: "success", message: res.msg });
                    }
                  },
                  function () {
                    this.$message.error(err.message || err.msg || "操作失败");
                  }
                );
              })
              .catch((err) => console.log(err));
          },
        },
        {
          name: "修改数量",
          showfn: (data) => {
            return data.status === 0 ? true : false;
          },
          fn: (data) => {
            this.changeDialogChangeVisible(true);
            this.formDialogsParams.currentData = data;
          },
        },
      ],
    },
  ],
};
