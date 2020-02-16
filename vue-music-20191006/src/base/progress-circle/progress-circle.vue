<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
              :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"
      ></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'progress-circle',
    props: {
      radius: {
        type: Number,
        default: 100
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    components: {},
    data() {
      return {
        dashArray: Math.PI * 100
      }
    },
    computed: {
      dashOffset() {
        return (1 - this.percent) * this.dashArray
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-circle
    position: relative

    circle
      stroke-width 8px
      transform-origin center

      &.progress-background
        -webkit-transform: scale(0.9)
        -moz-transform: scale(0.9)
        -ms-transform: scale(0.9)
        -o-transform: scale(0.9)
        transform: scale(0.9)
        stroke: $color-theme-d

      &.progress-bar
        -webkit-transform: scale(0.9) rotate(-90deg)
        -moz-transform: scale(0.9) rotate(-90deg)
        -ms-transform: scale(0.9) rotate(-90deg)
        -o-transform: scale(0.9) rotate(-90deg)
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>
