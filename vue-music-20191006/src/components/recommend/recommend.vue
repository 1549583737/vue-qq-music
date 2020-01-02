<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <!--better-scroll feedclick冲突-->
                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" class="item" :key="index">
              <div class="icon">
                <img v-lazy="item.imgurl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <Loading></Loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import Slider from 'base/slider/slider'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Scroll from 'base/scroll/scroll'

  export default {
    name: 'recommend',
    components: {
      Slider,
      Scroll,
      Loading
    },
    created () {
      // setTimeout(() => {
      //   this._getRecommend()
      // }, 1000)
      setTimeout(() => {
        this._getDiscList()
      }, 1000)
      this._getRecommend()
      // this._getDiscList()
    },
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0

    .recommend-content
      height 100%
      overflow hidden

      .slider-wrapper
        position relative
        width 100%
        overflow hidden

      .recommend-list
        h1.list-title
          height 65px
          line-height 65px
          font-size 14px
          text-align center
          color #ffcd32

        ul
          li.item
            display flex
            padding 0 20px 20px 20px
            align-items center
            box-sizing border-box

            div.icon
              flex 0 0 60px
              width 60px
              padding-right 20px

            div.text
              display flex
              flex-direction column
              justify-content center
              flex 1
              line-height 20px
              font-size 14px

              .name
                margin-bottom 10px
                color #ffffff

              .desc
                color rgba(255, 255, 255, .3)

    .loading-container
      position absolute
      width 100%
      top 50%
      transform: translateY(-50%)

</style>
