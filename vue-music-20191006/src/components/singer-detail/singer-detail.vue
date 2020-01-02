<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    <!--<div class="singer-detail"></div>-->
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getMusic, getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters(['singer']
      )
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then(res => {
          if (res.code === ERR_OK) {
            // this._normalizeSongs(res.data.list)
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        // console.log('list: ', list)
        // debugger
        let ret = []
        if (!list) {
          return
        }
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            getMusic(musicData.songmid).then(res => {
              if (res) {
                const startIndex = res.indexOf('(')
                const stopIndex = res.indexOf(')')
                const response = JSON.parse(res.slice(startIndex + 1, stopIndex))
                const vkey = response.data.items[0].vkey
                ret.push(createSong(musicData, vkey))
              }
            })
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  /*.singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background*/

  .slide-enter-active, .slide-leave-active
    transition: all .3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
