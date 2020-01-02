<template>
    <div>
        推荐页面
    </div>
</template>
<script  type="text/ecmascript-6">

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    import {getRecommend} from 'api/recommend'

    export default {
        created() {

        },
        methods: {
            _getRecommend() {
                getRecommend().then()
            }
        }
    }

</style>