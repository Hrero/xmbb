// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Kop from "@didi/kop-server";
import qiankunRender from "@/assets/js/qiankun";

Vue.config.productionTip = false;

const {
  THISPAGEDATA: { userId, ticket, bizEnv = "stable" },
} = window;

const kopGateway = {
  stable: "//pinzhi.didichuxing.com/hm_kop_stable/gateway",
  preonline: "//predaijiays.kuaidadi.com/gateway",
  online: "//htwkop.xiaojukeji.com/gateway",
};

const ssoAppId = {
  stable: "a17ea66a8dde1c30368fb37f2a4d5eeb",
  preonline: "1046",
  online: "1046",
};

const kop = new Kop({
  kopGateway: kopGateway[bizEnv],
  kopAppKey: "7f3b035f41254085b901972f5a03ffa9",
  kopAppSec: "5912d1007bd74c76a2b9a14bb9917390",
  ssoAppId: ssoAppId[bizEnv],
  token: ticket,
  userId,
  userRole: 1,
  subAuthType: 1,
});

Object.assign(Vue.prototype, { $kop: kop });

const { bootstrap, mount, unmount } = qiankunRender(App);
export { bootstrap, mount, unmount };
