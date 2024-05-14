<template>
  <div class="mot">
    <div class="bb">
      <img class="iii" src="./assets/mt.png" alt="">
    </div>
    <div class="positnn">
      <ul v-for="(item, index) in mtRankList" :key="item.logo">
        <li :class="['li', item.keyAnd == master ? 'activion' : '']">
          <div class="pm">{{ index + 1 }}</div>
          <div class="logodd">
            <img class="logoA" :src="item.logo">
          </div>
          <div class="textF">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
  <div>
    <el-input class="input1" type="text" @change="lala" v-model="rankValue"></el-input>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import { cloneDeep } from 'lodash'
export default {
  name: 'App',
  data: function () {
    return {
      masterStartRank: 9, // 排名+1
      master: 'A',
      rankValue: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      mtRankList: [{
        keyAnd: 'E',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/aprilia.png',
        name: 'aprilia rsv4'
      }, {
        keyAnd: 'B',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/bnl.png',
        name: 'Benelli 752S'
      }, {
        keyAnd: 'C',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/bt.png',
        name: 'HONDA CBR1000RR (二蛋)'
      }, {
        keyAnd: 'D',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/agst.png',
        name: 'Agusta F4RR'
      }, {
        keyAnd: 'A',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/cq.png',
        name: 'KAWASAKI NINJA ZX-10R (小帅)',
      }, {
        keyAnd: 'F',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/dkd.png',
        name: 'Ducati Panigale V4 R'
      }, {
        keyAnd: 'G',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/ktm.png',
        name: 'KTM 1290 SUPER DUKE R'
      }, {
        keyAnd: 'H',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/lm.png',
        name: 'SUZUKI GSX1300R HAYABUSA隼'
      }, {
        keyAnd: 'I',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/ymh.png',
        name: 'YAMAHA YZF-R1M'
      }, {
        keyAnd: 'J',
        logo: 'http://hangzhou-xmbb.oss-cn-hangzhou.aliyuncs.com/mt/logo/bm.png',
        name: 'BMW S 1000 RR'
      }]
    };
  },
  mounted() {
    this.agaio()
    document.onkeydown = keydown;
    let keyName = ''
    let keystring = ''
    function keydown(e) {
      var e = e || event;
      var currKey = e.keyCode || e.which || e.charCode;
      if ((currKey > 7 && currKey < 14) || (currKey > 31 && currKey < 47)) {
        switch (currKey) {
          case 8: keyName = "[退格]"; break;
          case 9: keyName = "[制表]"; break;
          case 13: keyName = "[回车]"; break;
          case 32: keyName = "[空格]"; break;
          case 33: keyName = "[PageUp]"; break;
          case 34: keyName = "[PageDown]"; break;
          case 35: keyName = "[End]"; break;
          case 36: keyName = "[Home]"; break;
          case 37: keyName = "[方向键左]"; break;
          case 38: keyName = "[方向键上]"; break;
          case 39: keyName = "[方向键右]"; break;
          case 40: keyName = "[方向键下]"; break;
          case 46: keyName = "[删除]"; break;
          default: keyName = ""; break;
        }
        keystring += keyName;
      }
      changeAc(keyName)
      console.log(keystring, keyName);
    }
    function changeAc(keyName) {
      if (keyName == '[方向键下]') {

      }
      if (keyName == '[方向键上]') {

      }
    }
  },
  methods: {
    agaio() {
      const arr = []
      for (let j = 0; j < this.rankValue.length; j++) {
        const val = this.rankValue[j];
        for (let i = 0; i < this.mtRankList.length; i++) {
          const rank = this.mtRankList[i];
          if (val == rank.keyAnd) {
            arr.push(rank)
          }
        }
      }
      this.mtRankList = cloneDeep(arr)
    },
    lala(e) {
      console.log(e, '===');
      this.agaio()
    }
  }
};
</script>

<style scoped>
.logodd {
  width: 20px;
  display: flex;
  align-items: center;
}

.textF {
  color: #fff;
  margin-left: 15px;
}

.logoA {
  width: 100%;
  border-radius: 50%;
}

.mot {
  width: 400px;
  /* border: 1px solid #000; */
  position: relative;
  margin-bottom: 100px;
}

.positnn {
  width: 300px;
  position: absolute;
  top: 180px;
  padding-top: 40px;
  padding-bottom: 5px;
  right: 0;
  background: #000;
}

.bb {
  width: 100%;
  /* background-color: red; */
  /* background-image: url('./assets/mt.jpg');
  background-repeat: no-repeat;
  background-size: contain; */
}

.li {
  display: flex;
  height: 30px;
  align-items: center;
}

.activion {
  background-color: #952fb8;
}

.input1 {
  position: fixed;
  width: 200px;
  height: 30px;
  right: 0;
  top: 100px;
}

.pm {
  width: 30px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
}

.iii {
  width: 100%;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

html,
body {
  height: 100%;
}

html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
div,
dl,
dt,
dd,
ul,
ol,
li,
p,
blockquote,
pre,
hr,
figure,
table,
caption,
th,
td,
form,
fieldset,
legend,
input,
button,
textarea,
menu {
  margin: 0;
  padding: 0;
}

header,
footer,
section,
article,
aside,
nav,
hgroup,
address,
figure,
figcaption,
menu,
details {
  display: block;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

caption,
th {
  text-align: left;
  font-weight: normal;
}

html,
body,
fieldset,
img,
iframe,
abbr {
  border: 0;
}

i,
cite,
em,
var,
address,
dfn {
  font-style: normal;
}

[hidefocus],
summary {
  outline: 0;
}

li {
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
small {
  font-size: 100%;
}

sup,
sub {
  font-size: 83%;
}

pre,
code,
kbd,
samp {
  font-family: inherit;
}

q:before,
q:after {
  content: none;
}

textarea {
  overflow: auto;
  resize: none;
}

label,
summary {
  cursor: default;
}

a,
button {
  cursor: pointer;
}

h1,
h2,
h3,
h4,
h5,
h6,
em,
strong,
b {
  font-weight: bold;
}

del,
ins,
u,
s,
a,
a:hover {
  text-decoration: none;
}

body,
textarea,
input,
button,
select,
keygen,
legend {
  font: 12px/1.14 Microsoft YaHei, arial, \5b8b\4f53;
  color: #333;
  outline: 0;
}

body {
  background: #fff;
}

a,
a:hover {
  color: #333;
}

* {
  box-sizing: border-box;
}
</style>
