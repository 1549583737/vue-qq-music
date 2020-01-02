<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <MHeader></MHeader>
    <Tab></Tab>
<!-- 把DOM缓存到内存中 -->
    <keep-alive> 
        <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
// import MHeader from 'components/m-header/m-header' //需要在webpack.base.conf.js配置
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"

#app {
  color $color-theme
}
</style>
