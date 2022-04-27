<template lang="pug">
  md-app
    md-app-toolbar.md-layout.md-alignment-center.no-auth
        h3 Basebone Frontend
    md-app-content.md-layout.md-alignment-center
      nuxt
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'default'
})
</script>
<style lang="css" scoped>
.md-app {
  /* min-height: 100vh; */
}
.no-auth {
  background: #e9eff6 0% 0% no-repeat padding-box;
  /* background: #fff 0% 0% no-repeat padding-box; */
}
.md-toolbar {
  background: #eff3f7 0% 0% no-repeat padding-box;
  box-shadow: none;
}
</style>
