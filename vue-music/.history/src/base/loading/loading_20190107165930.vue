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
            default: "正在jia'zai"
        }
    }
}
</script>

<style scoped lang="stylus" rel='stylesheet/stylus'>

</style>