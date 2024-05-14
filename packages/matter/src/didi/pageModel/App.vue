<template>
  <div id="app">
    <FormTable :formActions="formActions" />
  </div>
</template>

<script>
import FormTable from './components/formTable';

export default {
  name: 'App',
  components: {
    FormTable
  },
  data: function () {
    return {
      formActions: {}
    };
  },
  mounted: function () {},
  filters: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
