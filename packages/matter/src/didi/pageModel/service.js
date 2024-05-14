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
  var authCity = pageData.citys || [];
  var city = [];
  if (authCity.length) {
    for (var i = 0; i < authCity.length; i++) {
      if (authCity[i].taxi_id == "0") {
        city = [0];
        break;
      }
      city.push(Number(authCity[i].taxi_id));
    }
  }
  city = JSON.stringify(city);

  if (params.actype) {
    const cfg = {
      path: "",
      method: "",
      version: "1.0.0",
      args: [java("java.lang.String", params.sendData)],
      attchmentArgs: {
        userId: pageData.userId,
        userNameCN: pageData.userNameCN,
        cityIds: pageData.citys.map((v) => v.id),
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

