<template>
    <div class="tab">
       <router-link class="tab-item" to="/recommend"><span>推荐</span></router-link>
       <router-link class="tab-item" to="/singer"><span>歌手</span></router-link>
       <router-link class="tab-item" to="/rank"><span>排行</span></router-link>
       <router-link class="tab-item" to="/search"><span>搜索</span></router-link>
    </div>
</template>
<script  type="text/ecmascript-6">
import Rank from '../rank/rank'
import Recommend from '../recommend/recommend'
import Search from '../search/search'
import Singer from '../singer/singer'

export default {
  components: {
    Recommend,
    Search,
    Rank,
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