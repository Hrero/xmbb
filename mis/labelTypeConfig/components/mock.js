// export const treeData = {
//   name: "flare",
//   id: "x",
//   type: "task",
//   children: [
//     {
//       name: "analytics",
//       type: "task",
//       id: "x",
//       children: [
//         {
//           name: "cluster",
//           type: "task",
//           id: "x",
//           children: [
//             {
//               name: "AgglomerativeCluster",
//               id: "x",
//               type: "label",
//               value: 3938,
//             },
//             { name: "CommunityStructure", id: "x", type: "sql", value: 3812 },
//             { name: "HierarchicalCluster", id: "x", type: "hive", value: 6714 },
//             { name: "MergeEdge", id: "x", type: "sql", value: 743 },
//           ],
//         },
//         {
//           name: "graph",
//           type: "task",
//           id: "x",
//           children: [
//             {
//               name: "BetweennessCentrality",
//               id: "x",
//               type: "hive",
//               value: 3534,
//             },
//             { name: "LinkDistance", id: "x", type: "hive", value: 5731 },
//             { name: "MaxFlowMinCut", id: "x", type: "label", value: 7840 },
//             { name: "ShortestPaths", id: "x", type: "label", value: 5914 },
//             { name: "SpanningTree", id: "x", type: "sql", value: 3416 },
//           ],
//         },
//         {
//           name: "optimization",
//           type: "task",
//           id: "x",
//           children: [
//             { name: "AspectRatioBanker", id: "x", type: "sql", value: 7074 },
//           ],
//         },
//       ],
//     },
//     {
//       name: "animate",
//       type: "task",
//       id: "x",
//       children: [
//         { name: "Easing", id: "x", type: "label", value: 17010 },
//         { name: "FunctionSequence", id: "x", type: "hive", value: 5842 },
//         {
//           name: "interpolate",
//           type: "task",
//           id: "x",
//           children: [
//             { name: "ArrayInterpolator", id: "x", type: "label", value: 1983 },
//             { name: "ColorInterpolator", id: "x", type: "hive", value: 2047 },
//             { name: "DateInterpolator", id: "x", type: "label", value: 1375 },
//             { name: "Interpolator", id: "x", type: "hive", value: 8746 },
//             { name: "MatrixInterpolator", id: "x", type: "label", value: 2202 },
//             { name: "NumberInterpolator", id: "x", type: "hive", value: 1382 },
//             { name: "ObjectInterpolator", id: "x", type: "label", value: 1629 },
//             { name: "PointInterpolator", id: "x", type: "label", value: 1675 },
//             {
//               name: "RectangleInterpolator",
//               id: "x",
//               type: "label",
//               value: 2042,
//             },
//           ],
//         },
//         { name: "ISchedulable", id: "x", type: "label", value: 1041 },
//         { name: "Parallel", id: "x", type: "label", value: 5176 },
//         { name: "Pause", id: "x", type: "label", value: 449 },
//         { name: "Scheduler", id: "x", type: "hive", value: 5593 },
//         { name: "Sequence", id: "x", type: "label", value: 5534 },
//         { name: "Transition", id: "x", type: "hive", value: 9201 },
//         { name: "Transitioner", id: "x", type: "label", value: 19975 },
//         { name: "TransitionEvent", id: "x", type: "sql", value: 1116 },
//         { name: "Tween", id: "x", type: "label", value: 6006 },
//       ],
//     },
//   ],
// };

export const treeData = {
  name: "资损",
  type: "tag",
  id: null,
  value: null,
  children: [
    {
      name: "opStatus",
      type: "variable",
      id: null,
      value: null,
      children: [
        {
          name: "heart_topic",
          type: "ddmq",
          id: null,
          value: null,
          children: null,
        },
      ],
    },
    {
      name: "低电",
      type: "tag",
      id: null,
      value: null,
      children: [
        {
          name: "batterleveldecrease",
          type: "variable",
          id: null,
          value: null,
          children: null,
        },
        {
          name: "opStatus",
          type: "variable",
          id: null,
          value: null,
          children: [
            {
              name: "heart_topic",
              type: "ddmq",
              id: null,
              value: null,
              children: null,
            },
          ],
        },
      ],
    },
  ],
  _onlyData: true,
  code: 1,
}

export const querySibShipGraphNodeDetailCard = {
  code: 200,
  data: {
    rowList: [
      {
        key: "标签ID",
        value: "10009",
      },
      {
        key: "标签名称",
        value: "低电",
      },
      {
        key: "业务线",
        value: "单车",
      },
      {
        key: "标签类型",
        value: "基础标签",
      },
      {
        key: "是否可配置规则",
        value: "是",
      },
      {
        key: "是否可配置触发事件",
        value: "是",
      },
      {
        key: "标签描述",
        value: "从标签枚举类中同步标签信息",
      },
      {
        key: "修改时间",
        value: "2020-05-20 15:52:05.000",
      },
      {
        key: "操作人",
        value: "system",
      },
      {
        key: "创建时间",
        value: "2020-05-20 15:52:05.000",
      },
      {
        key: "备注",
        value: "",
      },
    ],
    _onlyData: true,
    code: 1,
  },
  msg: "成功",
  _cookie: {},
  _redirectToPage: "",
  _onlyData: true,
};

export const queryTagSibShipNodeTypeList = {
  code: 200,
  data: ["tag", "variable", "shumeng", "system_inner", "hive", "kafka", "ddmq"],
  msg: "成功",
};
