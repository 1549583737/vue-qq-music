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
    import BScroll from 'better-scroll'
    export default {
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        mounted: {
            setTimeout(()=>{
                
            })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
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
                    width: 100%
            .dots        
                position: absolute
                right: 0
                left: 0
                bottom: 12px
                text-align: center



</style>
