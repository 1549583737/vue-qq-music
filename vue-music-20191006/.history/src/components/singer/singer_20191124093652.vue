<template>
  <div>
    歌手页面
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'

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
            console.log(this.singers);
            
          }
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
