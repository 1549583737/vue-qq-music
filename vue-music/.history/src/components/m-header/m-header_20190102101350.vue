<template>
    <div class="m-header">
       <div class="icon"></div>
       <h1  class="text">Chicken Music</h1>
       <div class="mine">
           <i class="icon-mine"></i>
       </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {

}
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
            bg-image: 'logo'
            background-siz:
            height: 33px
            width 33px

        .mine
            position: absolute
            top: 0
            right: 0
            .icon-mine
              display: block
              padding: 12px
              font-size: 20px
              color: $color-theme
</style>
