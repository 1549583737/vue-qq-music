<template >
    <div class="loading">
        <img src="" alt="" width="24" height="24">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        title: {
            type: String,
            default: "正在加载中..."
        }
    }
}
</script>

<style scoped lang="stylus" rel='stylesheet/stylus'>
    @import url('~common/stylus/variable');

    .loading
        width: 100%
        text-align: center
</style>