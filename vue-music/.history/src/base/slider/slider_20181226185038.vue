<template>
    <div class="slider">
        <div class="slider-group">
            <slot></slot>
        </div>
        <div class="dots">

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slider
        min-height: 1px
        .slider-group
            position: relative
            overflow: hidden
            white-space: no-wrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden 
                    text-decoration: none
                img
                    display: block
                    



</style>
