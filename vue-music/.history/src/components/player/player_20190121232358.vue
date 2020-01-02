<template>
    <div class="player" v-show="playlist.length>0">
        <div class="normal-player" v-show="fullScreen">
          <div class="background">
            <img src="" alt="" width="100%" height="100%">
          </div>
          <div class="top">
            <div class="back">
              <i class="icon-back"></i>
            </div>
            <h1 class="title"></h1>
            <h2 class="subtitle"></h2>
          </div>
          <div class="middle">
            <div class="middle-l">
              <div class="cd-wrapper">
                <div class="cd">
                  <img src="" alt="" class="image">
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="operators">
              <div class="icon i-left">
                <i class="icon-sequence"></i>
              </div>
              <div class="icon i-left">
                <i class="icon-prev"></i>
              </div>
              <div class="icon i-center">
                <i class="icon-play"></i>
              </div>
              <div class="icon i-right">
                <i class="icon-next"></i>
              </div>
              <div class="icon i-right">
                i.icon.icon-not-
              </div>
            </div>
          </div>
        </div>
        
        <div class="mini-player" v-show="!fullScreen">
          <div class="icon">
            <img src="" width="40" height="40" alt="">
          </div>
          <div class="text">
            <h2 class="name"></h2>
            <p class="desc"></p>
          </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'fullScreen',
                'playlist'
            ])
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
      padding-top: 70%
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