<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import Singer from 'common/js/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_LENGTH = 10

  export default {
    name: 'singer',
    components: {
      ListView
    },
    data () {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      selectSinger(singer) {
        // this.$router.push({
        //   path: `/singer/${singer.id}`
        // })
        this.$router.push({ // SingerDetail跳转到歌手详情页面
        name: 'SingerDetail',
        params: {id: singer.id}
      })
      this.SET_SINGER(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list
            this.singers = this._normalizeSinger(this.singers)
            console.log(this.singers)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item['Findex']
          if (!map[key]) {
            map[key] = {
                title: key,
                items: []
            }
          }
          map[key].items.push(new Singer({
             id: item.Fsinger_mid,
             name: item.Fsinger_name
          }))
        })
        // 为了得到有序列表，我们需要处理map
        let hot = []
        let ret = []
        for (const key in map) {
          let val = map[key]
            if (val['title'].match(/[a-zA-Z]/)) {
              ret.push(val)
            } else if (val['title'] === HOT_NAME) {
              hot.push(val)
            }
        }
        ret.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations([
        'SET_SINGER'
        ]
      )
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .singer
        position fixed
        top: 88px
        bottom: 0
        width: 100%

    .parent
         display flex
         width 600px
         div
            height 100px
            &.item-1
                 width 140px
                 flex 2 1 0%
                 background blue
             &.item-2
                 width 100px
                 flex 2 1 auto
                background darkblue
             &.item-3
                 flex 1 1 200px
                 background lightblue
</style>
