<template>
    <div class="music-list">
        <div class="back" @click="$router.go(-1)">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
            <div class="song-list-wrapper">
                <song-list :songs="songs"></song-list>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import SongList from 'base/song-list/song-list'

    const RESERVED_HEIGHT = 40;

    export default {
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                scrollY: 0
            }
        },
        computed: {
            bgStyle() {
                return `background-image:url(${this.bgImage})`
            }
        },
        created() {
            this.probeType = 3;
            this.listenScroll = true;
        },
        mounted() {
            this.imageHeight = this.$refs.bgImage.clientHeight;
            this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
            this.$refs.list.$el.style.top = `${this.imageHeight}px`
        },
        methods: {
            scroll(pos) {
                this.scrollY = pos.y
            }
        },
        watch: {
            scrollY(newY) {
                let translateY = Math.max(this.minTranslateY, newY); 
                let zIndex = 0
                this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`;
                this.$refs.layer.style['webkitTransform'] = `translate3d(0,${translateY}px,0)`;
                if(newY < this.minTranslateY) {
                    zIndex = 10;
                    this.$refs.bgImage.style.paddingTop = 0;
                    this.$refs.style.height = `{RESERVED_HEIGHT}px`
                }
            }
        },
        components: {
            Scroll,
            SongList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .music-list
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%  // 宽比高 10: 7
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

