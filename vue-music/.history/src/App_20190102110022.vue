<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <MHeader></MHeader>
    <tab></tab>

    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import tab from 'components/tab/tab'
// import MHeader from 'components/m-header/m-header' //需要在webpack.base.conf.js配置
export default {
  name: 'App',
  components: {
    MHeader,
    tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"

#app {
  color $color-theme
}
</style>
