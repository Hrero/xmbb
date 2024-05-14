const { getData } = require("@lib/utils");
module.exports = function main(event, context, callback) {
  const { java } = context;
  const { req } = event;
  const {
    dubbo,
    bizData: { pageData },
  } = req;
  const params = req.body || req.query;
  const { userId, citys, userNameCN, resouceUrls, ticket, userName } = pageData

  var actype = params.actype;
  var sendData = params.sendData ? JSON.parse(params.sendData) : {};
  
  // var logPrefix = 'log-hm-labelTypeConfig';
  
  // 部分接口鉴权需要 citys
  var authCity = citys || [];
  var city = [];
  if (authCity.length) {
      for (var i = 0; i < authCity.length; i++){
          if (authCity[i].taxi_id == '0') {
              city = [0];
              break;
          }
          city.push(Number(authCity[i].taxi_id));
      }
  }
  city = JSON.stringify(city);
  
  var actionMap = {
    // 新增
    'saveAssetTag': {
      path: 'com.didi.blackhorse.vehicle.profile.api.assettag.tag.service.AssetTagRemoteService',
      method: 'saveAssetTag'
    },
    // 查询列表
    'queryAssetTag': {
      path: 'com.didi.blackhorse.vehicle.profile.api.assettag.tag.service.AssetTagRemoteService',
      method: 'queryAssetTag'
    },
    // 查询列表
    'queryTagSibShipGraph': {
      path: 'com.didi.blackhorse.vehicle.profile.task.api.sibship.TagSibShipRemoteService',
      method: 'queryTagSibShipGraph'
    },
    'querySibShipGraphNodeDetailCard': {
      path: 'com.didi.blackhorse.vehicle.profile.task.api.sibship.TagSibShipRemoteService',
      method: 'querySibShipGraphNodeDetailCard'
    },
    'queryTagSibShipNodeTypeList': {
      path: 'com.didi.blackhorse.vehicle.profile.task.api.sibship.TagSibShipRemoteService',
      method: 'queryTagSibShipNodeTypeList'
    }
  }
  
  var config = actionMap[actype]
  
  if (config) {
    var cfg = {
      path: config.path,
      method: config.method,
      version: '1.0.0',
      args: java('java.lang.String', JSON.stringify(sendData)),
      attchmentArgs:{userId, userNameCN, cityIds: city}
    }
    if (config.bizModule) {
      cfg.bizModule = config.bizModule;
    }
    // Log.clog(`${logPrefix}-${actype}`, JSON.stringify(sendData))
  
    if (cfg.method === 'queryTagSibShipNodeTypeList') {
      delete cfg.args
    }
    getData(cfg, dubbo, function (result) {
      result._onlyData = true
      callback(null, result)
      // Log.clog(`${logPrefix}-${actype}-back`, JSON.stringify(result))
    })
  } else {
    /*页面渲染*/
    pageData.data = JSON.stringify({
      authority: resouceUrls || [],
      citys: citys || [],
      userNameCN,
      userId,
      ticket,
      userName
    });
    callback(null, pageData)
  }
  
};
