
export const BIZ_TYPE_MAP = new Map(
  [
    [1, '电单车'],
    [2, '单车'],
    [4, '电池'],
    [5, '订单']
  ]
)

// 资产画像平台接入 移除单车/电单车/订单 用于新增dialog
export const BIZ_TYPE_MAP_ADD = new Map(
    [
        [4, '电池']
    ]
)

export const TAG_TYPE_MAP = new Map([
  [0, '基础标签'],
  [1,'换电标签'],
  [2,'捞车标签'],
  [3,'找摆标签'],
  [4,'策略标签'],
  [5,'临时标签'],
  [6,'运维标签'],
  [7,'工单标签'],
  [8,'其他标签']
])

export const TABLE_HEADER = [
  {
    label: '标签ID',
    prop: 'tagId'
  }, {
    label: '标签名称',
    prop: 'tagName'
  }, {
    label: '业务线',
    prop: 'bizType'
  }, {
    label: '标签类型',
    prop: 'tagTypeName'
  }, {
    label: '是否可配置规则',
    prop: 'tagRuleConfigurable'
  }, {
    label: '是否可配置触发事件',
    prop: 'triggerEventConfigurable',
    width: 147
  }, {
    label: '备注',
    prop: 'description'
  }, {
    label: '操作人',
    prop: 'operatorName'
  }
]
