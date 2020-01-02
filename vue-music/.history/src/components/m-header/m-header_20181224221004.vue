<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Chicken Music</h1>
    </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .m-header
        position: relative
        height: 44px
        text-align: center
        color: $color-theme
        font-size: 0
        .icon
            display: inline-block
            vertical-align: top
            line-height: 44px
            font-size: $font-size
</style>
