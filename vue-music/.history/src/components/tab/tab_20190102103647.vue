<template>
    <div class="tab">
       router-link>span
    </div>
</template>
<script  type="text/ecmascript-6">
import Rank from '../rank/rank'
import Recommend from '../recommend/recommend'
import Search from '../search/search'
import Singer from '../singer/singer'

export default {
  components: {
    Rank,
    Recommend,
    Search,
    Singer
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
   .tab
      display: flex
      height: 44px
      line-height: 44px
      font-size: $font-size-medium
      .tab-item
         flex: 1
         text-align: center
         .tab-link
            padding-bottom: 5px
            color: $color-text-l
         &.router-link-active
            color: $color-theme
            border-bottom: 2px $color-theme solid
</style>