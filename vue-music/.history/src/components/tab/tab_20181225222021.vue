<template>
    <div class="tab">
     <!-- <router-view></router-view> -->
     <router-link class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
     </router-link>
     <router-link class="tab-item" to="/rank">
        <span class="tab-link">排行</span>
     </router-link>
     <router-link class="tab-item" to="/search">
        <span class="tab-link">搜索</span>
     </router-link>
     <router-link class="tab-item" to="/singer">
        <span class="tab-link">歌手</span>
     </router-link>
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

      .router-link-active
        color: #e22
</style>