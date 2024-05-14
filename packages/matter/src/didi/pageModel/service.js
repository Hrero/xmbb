const { getData } = require("@lib/utils");
module.exports = function main(event, context, callback) {
  const { java } = context;
  const { req } = event;
  const {
    dubbo,
    bizData: { pageData },
  } = req;
  const params = req.body || req.query;
  // let { sendData = "{}" } = params;
  // sendData = JSON.parse(sendData);
  if (params.actype) {
    const cfg = {
      path: "",
      method: "",
      version: "1.0.0",
      args: [java("java.lang.String", params.sendData)],
      attchmentArgs: {
        userId: pageData.userId,
        userNameCN: pageData.userNameCN,
      },
    };

    switch (params.actype) {
      case "data":
        cfg.method = "getReceiveOrderListByPageForMis";
        break;
      default:
        break;
    }
    getData(cfg, dubbo, function (data) {
      data._onlyData = true;
      callback(null, data);
    });
  } else {
    callback(null, pageData);
  }
};

