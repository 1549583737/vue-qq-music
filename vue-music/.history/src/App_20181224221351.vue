<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    MH
    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
export default {
  name: 'App',
  components: {
    MHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"

#app {
  color $color-theme
}
</style>
