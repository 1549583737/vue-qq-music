<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref=sliderGroup>
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {addClass, hasClass} from 'common/js/dom'

    export default {
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        props: {
            // 循环轮播
            loop: {
                type: Boolean,
                default: true
            },
            // 自动轮播
            autoPlay: {
                type: Boolean,
                default: true
            },
            // 间隔
            interval: {
                type: Number,
                default: 1000
            }
        },
        mounted() {
            setTimeout(()=>{
                this._setSliderWidth();
                this._initDots();
                this._initSlider();

                if(this.autoPlay){
                    this._play()
                }

            }, 20)
            //浏览器刷新通常17ms一次

            window.addEventListener('resize', ()=> {
                if(!this.slider){
                    return 
                }

                this._setSliderWidth(true)
                this.slider.refresh()
            })
        },
        methods: {
            //  横向滚动初始化宽度
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children; // 获取sliderGroup中的每个子元素

                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth; // 获取当前轮播图的宽度（父元素的宽度）
                for (let i = 0; i < this.children.length; i++) { // 设置每个轮播图的宽度
                    let child = this.children[i];
                    addClass(child, 'slider-item'); //addClass是一个封装好伪元素添加类名的函数，为子节点添加类名为slider-item 的类，进行CSS部分的渲染
                    
                    child.style.width = sliderWidth + 'px'; //设置每个子节点的宽度等于父元素的宽度
                    width += sliderWidth;   //累加计算父元素的总宽度
                }
                //如果是循环播放并且是首次初始化时，需要再加上头尾两个重复图片的宽度。而当浏览器调整大小的时候，父元素中的子元素已经包含了首位重复图片的元素，因此不需要进行宽度的增加。
                if(this.loop && !isResize){  //左右克隆两个dom
                    width += 2 * sliderWidth;   
                }
                this.$refs.sliderGroup.style.width = width + 'px'   //将总宽度赋值给父元素

            },
            _initDots() {
                this.dots = new Array(this.children.length);
            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snapLoop: this.loop,    //支持循环轮播 
                    snapSpeed: 100,        //
                    snap: {
                        autoPlay: this.autoPlay,
                        loop: this.,
                        threshold: 0.3, //可滚动到下一个的阈值
                        speed: 400
                    },
                    click: true
                })

                this.slider.on("scrollEnd", ()=>{
                    let pageIndex = this.slider.getCurrentPage().pageX; //获取轮播到的当前页
                    if(this.loop){
                        pageIndex -= 1; //去掉为了循环播放而多的第一页
                    }
                    this.currentPageIndex = pageIndex;
                    if(this.autoPlay){
                        clearTimeout(this.timer);   //清除定时器
                        this._play();   //自动
                    }
                })
            },
             _play() {
                let pageIndex = this.currentPageIndex + 1;
                if(this.loop){
                    pageIndex += 1;
                }

                this.timer = setTimeout(()=> {
                    this.slider.goToPage(pageIndex, 0, 400)
                }, this.interval)
            },
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
            white-space: nowrap
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
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>
