<template>
  <div>
    歌手页面
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { Singer } from 'common/js'
import { ERR_OK } from 'api/config'

const HOT_NAME = '热门'
const HOT_LENGTH = 10

  export default {
    name: 'singer',
    components: {},
    data () {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list
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
          map[key].items.push(new{
             id: item.Fsinger_mid,
             name: item.Fsinger_name
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .singer
    position fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
