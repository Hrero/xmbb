<template>
  <div class="mis-private-access__box">
    <div :class="accessClass">
      <span class="mis-private-access__data">
        <slot />
        <span> {{ info }} </span>
      </span>
      <div class="mis-private-access__view">
        <el-button
          type="primary"
          :size="size"
          @click="getTureInfo"
        >
          {{ tips }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@/mixin';
export default {
  name: 'MisPrivateAccess',
  mixins: [mixin],
  props: {
    data: {
      type: String,
      default: '', 
    },
    label: {
      type: String,
      default: '详细信息',
    },
    tips: {
      type: String,
      default: '查看',
    },
    size: {
      type: String,
      default: 'mini',
    }
  },
   data() {
    return {}
   },
  computed: {
    accessClass() {
      return [
        'mis-private-access',
        { vertical: this.vertical },
      ]
    },
    info() {
        let breakWordIndex = this.data.lastIndexOf('||')
        return this.data.substring(0, breakWordIndex); 
    },
    secret() {
         let breakWordIndex = this.data.lastIndexOf('||')
        return this.data.substring(breakWordIndex + 2); 
    }
  },
  methods: {
    async getTureInfo() {
        let params = {
            data: this.secret,
            pageUrl: window.location.href
        }
        const {
            data: { code, data = [], msg = '' }
        } = await this.$kop.send('hm.b.decryptData', params, '', {}, 'formData');
        if (code == 200) {
            this.$alert(`${this.label}：${data.sensitiveData}`, '', {
            confirmButtonText: '确定'
          });
        } else {
            this.$message.error(msg);
        }
        
    }
  }
}
</script>
<style lang="scss" scoped>
.mis-private-access__box {
  display: flex;
  justify-content: center;
}
.mis-private-access {
  display: flex;
  width: fit-content;
  align-items: center;
}

.vertical {
  flex-direction: column;
  .mis-private-access__data {
    margin-bottom: 8px;
  }
}

.mis-private-access:not(.vertical) {
  .mis-private-access__data {
    margin-right: 8px;
  }
}
</style>
