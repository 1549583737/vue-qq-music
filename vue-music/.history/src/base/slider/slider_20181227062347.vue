<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref=sliderGroup>
            <slot></slot>
        </div>
        <div class="dots">

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {addClass, hasClass} from 'common/js/dom'

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
        mounted() {
            setTimeout(()=>{
                this._setSliderWidth();
                this._initSlider();
            }, 20)
            //浏览器刷新通常17ms一次
        },
        methods: {
            _setSliderWidth() {
                this.childern = this.$refs.sliderGroup.childern;

                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;
                for (let i = 0; i < this.childern.length; i++) {
                    let child = this.childern[i];
                    addClass(child, 'slider-item');
                    child.style.width = sliderWidth + 'px';
                    width += sliderWidth;
                }
                if(this.loop){
                    width += 2 * sliderWidth;
                }
                this.$refs.sliderGroup.style.width = width + 'px'

            },
            _initSlider() {

            }
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
