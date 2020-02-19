<template>
  <!-- <div>
      歌手页面
      <div class="parent">
          <div class="item-1"></div>
          <div class="item-2"></div>
          <div class="item-3"></div>
      </div>
  </div> -->
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer' // 封装的歌手类 避免书写重复代码
  import ListView from 'base/listview/listview'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10 // 以前十条数据作为热门数据

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      selectSinger(singer) {
        // 路由跳转
        // this.$router.push({
        //     path: `/singer/${singer.id}`
        // })
        this.$router.push({ // SingerDetail跳转到歌手详情页面
          name: 'Singer',
          params: {id: singer.id}
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list
            console.log('原始数据: ', this.singers)
            this.singers = this._normalizeSinger(this.singers)
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
        // forEach遍历数组
        list.forEach((element, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(
              new Singer({
                id: element.Fsinger_mid,
                name: element.Fsinger_name
              })
            )
          }

          const key = element.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(
            new Singer({
              id: element.Fsinger_mid,
              name: element.Fsinger_name
            })
          )
        })
        // const tt = new Singer({id: 1, name: 'zyx'});
        // console.log('Singer: ', tt)

        console.log('排序前的map: ', map)
        // 为了得到有序列表， 我们需要处理map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }

        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        console.log('hot: ', hot)
        console.log('ret: ', ret)

        console.log('排序后的map: ', hot.concat(ret))
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
