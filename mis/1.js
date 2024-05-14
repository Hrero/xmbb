import MisPrivateAccess from '@/components/MisPrivateAccess.vue'
// import { downloadFile } from '@didi/hm-mis-helper'

export default {
  name: 'App',
  components: {MisPrivateAccess},

  isForm: true

  <MisPrivateAccess
  v-if="scope.row.managerMobile"
  tips="查看"
  label="负责人电话"
  :data="scope.row.managerMobile"
/>


<MisPrivateAccess
v-if="detail['deliveryOrderInfoResp']['inContactMobile']"
tips="查看"
label="收货联系人电话"
:data="detail['deliveryOrderInfoResp']['inContactMobile']"
/>

case "queryAllStorageNodeInfoJson":
    cfg.path =
      "com.didi.haitangwan.sc.meta.api.service.StorageNodeRemoteService";
    cfg.method = "queryAllStorageNodeInfoJson";
    cfg.attchmentArgs = {
      userId,
      userName,
      userNameCN,
      "sensitiveFilterConfig":JSON.stringify({
        "sens":{
            "$.data.*.managerMobile":{"type":1,"cipher":true},
        }
      }) 
    }
    break;


    case "queryDeliveryOrderDetailInfo":
        cfg.path =
          "com.didi.order.management.system.api.fe.DeliveryOrderFeService";
        cfg.method = "queryDeliveryOrderDetailInfo";
        cfg.attchmentArgs = {
          userId,
          userNameCN,
          "sensitiveFilterConfig":JSON.stringify({
            "sens":{
                "$.data.deliveryOrderInfoResp.inContactMobile":{"type":1,"cipher":true},
            }
        }) 
        }
        break;


            case "queryDeliveryOrderDetail":
                cfg.attchmentArgs = {
                  userId,
                  userName,
                  userNameCN,
                  "sensitiveFilterConfig":JSON.stringify({
                    "sens":{
                        "$.data.deliveryOrderInfoResp.outLogisticsInfo": {
                          "sens": {
                            "$.driverPhone": {"type":1,"cipher":true},
                          }
                        }
                    }
                }) 
                }
                break;