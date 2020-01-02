<template>
    <div>
        <router-view></router-view>
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
        
    }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>