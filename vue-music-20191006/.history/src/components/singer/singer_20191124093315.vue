<template>
  <div>
    歌手页面
  </div>
</template>

<script>
  export default {
    name: 'singer',
    components: {},
    data () {
      return {
        singers: []
      }
    },
    created() {
      this.$nextTick(() => {
        this._getSingerList()
      })
    },
    methods: {
      _getSingerList() {

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
