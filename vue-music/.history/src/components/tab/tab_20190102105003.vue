<template>
    <div class="tab">
       <router-link class="tab-item" to="/recommend"><span class="tab-link">推荐</span></router-link>
       <router-link class="tab-item" to="/singer"><span class="tab-link">歌手</span></router-link>
       <router-link class="tab-item" to="/rank"><span class="tab-link">排行</span></router-link>
       <router-link class="tab-item" to="/search"><span class="tab-link">搜索</span></router-link>
    </div>
</template>
<script  type="text/ecmascript-6">
import Recommend from '../recommend/recommend'
import Singer from '../singer/singer'
import Rank from '../rank/rank'
import Search from '../search/search'

export default {
  components: {
    Recommend,
    Singer,
    Rank,
    Search,
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
   .tab
      display flex
      .tab-item
         flex-grow: 1
         text-align center
         color $color-theme
         padding 9px 6px
         .tab-link
            color $color-text-l
         &.router-link-active
               border-bottom 1px solid $color-theme
               .tab-link   
</style>