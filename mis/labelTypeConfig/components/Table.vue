<template>
  <div v-loading.fullscreen.lock="screenLoading">
    <el-table stripe border :height="info.formHeight" :data="list">
      <el-table-column v-for="(item, index) of info.tableHeader" :key="index" :label="item.label" :prop="item.prop"
        :width="item.width" align="center" :formatter="getFormat">
        <template slot-scope="scope">
          <div v-if="item.label === '标签ID'" class="poin">
            {{ scope.row[item.prop] }}
          </div>
          <div v-else>
            {{ scope.row[item.prop] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="info" class="table-btn-cell" @click="showDetail(scope.row)">血缘图</el-button>
        </template>
      </el-table-column>
      <slot name="after">
      </slot>
    </el-table>
    <el-dialog :title="titlec" :visible.sync="dialogVisible" width="90%">
      <div class="picWrap">
        <div class="echarsss1">
          <div class="ull">
            <div>图例 : </div>
            <ul class="ull1">
              <li class="li1" v-for="o in labels">
                <div class="sp" :style="{ backgroundColor: o.color }"></div>
                <div>{{ o.name }}</div>
              </li>
            </ul>
          </div>
          <div id="myMain" class="echarsss"></div>
        </div>
        <div class="aaTu">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ currInfo.name }}</span>
              <!-- <el-button @click="closeFn" style="float: right; padding: 3px 0" type="text">
                      <i class="el-icon-close"></i>
                    </el-button> -->
            </div>
            <div v-if="requ1" class="wrap">
              <div>
                加载中。。。
              </div>
            </div>
            <div v-else>
              <div v-if="details && details.length > 0">
                <div v-for="(o, k) in details" :key="k" class="text item">
                  <div class="deta1">
                    <div>{{ o.key }}</div>
                    <div class="so">{{ o.value ? o.value : '-' }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="contee" v-else>
                  无
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-dialog>
</div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  props: [
    'info',
    'list',
    'getFormat'
  ],
  data() {
    return {
      screenLoading: false,
      dialogVisible: false,
      mock: false,
      treeData: {},
      requ1: false,
      tagId: null,
      details: null,
      currInfo: {},
      labels: [],
      myChart: null,
      colors: ["#7EC0EE", "#FF9F7F", "#FFD700", "#C9C9C9", "#FF6347", "#E066FF", "#C0FF3E", "#2C71C1", "#36A2EB", "#4BC0C0", "#cccccc", "red", "blue", "yellow", "#000000", "#00FFFF", "#191970", "#00C78C", "#6B8E23", "#FF00FF", "#B0171F"],
      titlec: null,
      detail: null,
      ka: true
    }
  },
  mounted() {
    this.getLabel()
  },
  methods: {
    getLabel() {
      this.getData(
        {
          actype: 'queryTagSibShipNodeTypeList',
          sendData: JSON.stringify({})
        },
        (res) => {
          console.log(res, '=====');
          if (res.code === 200) {
            const bal = res.data
            this.labels = bal.map((item, index) => {
              return {
                color: this.colors[index],
                name: item
              }
            })
          } else {
            this.$message.error('22');
          }
        },
        (res) => {
          this.$message.error('数据失败~');
        }
      );
    },
    getData(params, _success, _error) {
      let _this = this;
      const data = params;
      data.sendData = JSON.stringify(data.sendData, function (key, value) {
        return value || value === 0 ? value : undefined;
      });
      $.ajax({
        type: 'post',
        url: '/didibike/misassets/labelTypeConfig.node',
        data,
        success: function success(res) {
          if (typeof _success === 'function') _success(res);
        },
        error: function error(res) {
          _this.screenLoading = false;
          if (typeof _error === 'function') _error(res);
        }
      });
    },
    showDetail(row) {
      this.dialogVisible = true
      this.screenLoading = true
      this.getData(
        {
          actype: 'queryTagSibShipGraph',
          sendData: {
            bizType: row.bizType,
            tagId: row.tagId
          }
        },
        (res) => {
          if (res.code === 200) {
            this.screenLoading = false
            this.gogogo(res.data)
          } else {
            this.$message.error(res.msg);
          }
        },
        (res) => {
          this.$message.error('数据失败~');
        }
      );
    },
    getDetailInfo(row) {
      console.log(row, 'rowrow');
      this.requ1 = true;
      this.getData(
        {
          actype: 'querySibShipGraphNodeDetailCard',
          sendData: {
            bizType: row.data.bizType,
            rootId: row.data.rootId,
            id: row.data.id,
            type: row.data.type
          }
        },
        (res) => {
          this.requ1 = false;
          if (res.code === 200) {
            this.details = res.data.rowList
            console.log(res, 'res');
          } else {
            this.$message.error(res.msg);
          }
        },
        (res) => {
          this.$message.error('数据失败~');
        }
      );
    },
    diguiColor(tree) {
      if (tree.children) {
        tree.children.forEach((datum, index) => {
          // index % 2 === 0 && (datum.collapsed = true);
          datum.collapsed = false
          console.log(this.labels, '_this.labels_this.labels');
          for (let index = 0; index < this.labels.length; index++) {
            const element = this.labels[index];
            console.log(element, datum, 2222);
            if (element.name == datum.type) {
              datum.itemStyle = {
                color: element.color
              }
            }
          }
          this.diguiColor(datum)
        });
      } else {
        const conMe = this.labels.find(item => item.name == tree.type)
        if (conMe) {
          tree.itemStyle = {
            color: conMe.color
          }
        }
      }
    },
    gogogo(data) {
      this.tagId = data.tagId
      this.titlec = data.name + '-关系图'
      this.treeData = data
      const _this = this
      setTimeout(ii => {
        var chartDom = document.getElementById('myMain');
        let myChart = echarts.init(chartDom);
        myChart.clear()
        myChart.showLoading();
        var option = null
        setTimeout(() => {
          myChart.hideLoading();
          console.log(this.treeData, 'treeDatatreeData');
          this.diguiColor(this.treeData)
          console.log(this.treeData, 'treeDatatreeData');
          myChart.setOption(
            (option = {
              tooltip: false,
              series: [
                {
                  type: 'tree',
                  name: 'flare',
                  roam: true,
                  data: [this.treeData],
                  top: '1%',
                  left: '7%',
                  bottom: '1%',
                  right: '20%',
                  symbolSize: 10,
                  label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 9
                  },
                  leaves: {
                    label: {
                      position: 'right',
                      verticalAlign: 'middle',
                      align: 'left'
                    }
                  },
                  emphasis: {
                    focus: 'descendant'
                  },
                  expandAndCollapse: true,
                  animationDuration: 550,
                  animationDurationUpdate: 750
                }
              ]
            })
          )
          myChart.on('click', (params) => {
            console.log(params)
            this.currInfo = params
            this.getDetailInfo(this.currInfo)
          })
        }, 1000)
        option && myChart.setOption(option);
        this.getDetailInfo({
          data: this.treeData
        })
      }, 100)
    },
    closeFn() {
      this.ka = false
    }
  }
}
</script>
<style lang="scss" scoped>
.poin {
  cursor: pointer;
}

.picWrap {
  display: flex;
  justify-content: center;
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.so {
  width: 200px;
}

.aaTu {
  width: 450px;
  // background: red;
  display: flex;
  justify-content: center;
}

.echarsss1 {
  width: 60%;
}

.deta1 {
  display: flex;
  justify-content: space-between;
}

.echarsss {
  width: 100%;
  height: 500px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 400px;
}

.ull {
  display: flex;
}

.ull1 {
  display: flex;
}

.sp {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: black;
  margin-right: 6px;
}

.li1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}

.contee{
    text-align: center;
}
</style>