const descriptionList = {
  title: "车辆id", // 名
  titleSupplement: "-", // 附标题
  info: [
    {
      key: "categoryNoDesc",
      label: "品类",
      value: "-",
    },
    {
      key: "modelNoDesc",
      label: "车辆型号",
      value: "-",
    },
    {
      key: "status",
      postList: [ // 根据列表生成状态
        {
          value: 1,
          label: "未生成",
        },
        {
          value: 2,
          label: "有效",
        },
        {
          value: 3,
          label: "作废",
        },
      ],
      label: "单品BOM状态",
      value: "-",
    },
    {
      key: "bikeMaterialNo",
      label: "裸车物料编码",
      value: "-",
    },
    {
      key: "bikeMaterialName",
      label: "裸车物料名称",
      value: "-",
    },
    {
      key: "bikeBomVersion",
      label: "裸车物料BOM版本",
      value: "-",
    },
    {
      key: "bomCode",
      label: "成品物料编码",
      value: "-",
    },
    {
      key: "bomName",
      label: "成品物料名称",
      value: "-",
    },
    {
      key: "bomVersion",
      label: "成品BOM版本",
      value: "-",
    },
    {
      key: "bikePartMaterialNo",
      label: "裸车组件物料编码",
      value: "-",
    },
    {
      key: "bikePartMaterialName",
      label: "裸车组件物料名称",
      value: "-",
    },
    {
      key: "bikePartBomVersion",
      label: "裸车组件BOM版本",
      value: "-",
    },
    {
      key: "inboundNo",
      label: "入库单号",
      value: "-",
    },
    {
      key: "orderNo",
      label: "归集单号",
      value: "-",
    },
    {
      key: "purchaseNo",
      label: "采购单号",
      value: "-",
    },
    {
      key: "gmtInbound",
      label: "入库时间",
      type: "date",
      value: "-",
    },
    {
      key: "storageName",
      label: "入库仓库",
      value: "-",
    },
  ],
};
