<template>
  <!--进度条 总体长度-->
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <!--进度条 已播放长度-->
      <div class="progress" ref="progress"></div>
      <!--进度条 按钮-->
      <div class="progress-btn-wrapper"
           ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')
  export default {
    name: 'progress-bar',
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent(newPercent) {
        // 没有在拖动的过程中watch
        if (newPercent >= 0 && !this.touch.initiated) {
          // 进度条的宽度减去小球的宽度
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          // 获得offset的距离
          const offsetWidth = newPercent * barWidth
          // 不断的改变style
          this._offset(offsetWidth)
        }
      }
    },
    data() {
      return {}
    },
    created() {
      this.touch = {} // 将touch的数据挂在此对象上  可以在move时获取start时的位置，计算出偏移量
    },
    methods: {
      progressTouchStart(e) {
        console.log(e)

        this.touch.initiated = true // 初始化
        this.touch.startX = e.touches[0].pageX // 记录触摸式的位置
        this.touch.left = this.$refs.progress.clientWidth // 记录已经进行的宽度 => 当前进度
      },
      progressTouchMove(e) {
        // 没有进行touchstart直接Move直接return
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX // 实时得到移动的x位点，减去记录的x坐标 == 偏移量
        console.log('start: ', this.touch.startX)
        console.log('cur: ', e.touches[0].pageX)
        console.log(deltaX)
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false
        this._trigglePercent()
      },
      progressClick(e) {
        console.log('e.offsetX:', e.offsetX)
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        // console.log('offsetWidth: ', offsetWidth)

        this._offset(offsetWidth)
        // 这里当我们点击 progressBtn 的时候， e.offsetX获取不对
        // this._offset(e.offsetX)
        this._trigglePercent()
      },
      _trigglePercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent) // 派发事件
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-bar
    height: 30px

    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, .3)

      .progress
        position: absolute
        height: 100%
        background: $color-theme

      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px

        .progress-btn
          position: relative
          top: 7px
          left: 7px
          -webkit-box-sizing: border-box
          -moz-box-sizing: border-box
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          -webkit-border-radius: 50%
          -moz-border-radius: 50%
          border-radius: 50%
          background: $color-theme
</style>
