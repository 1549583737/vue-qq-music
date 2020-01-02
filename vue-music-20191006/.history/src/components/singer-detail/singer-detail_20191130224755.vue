<template>
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
</template>
<script>
</script>
<style lang="stylus">
    .slide-enter-active, .slide-leave-active {
        transiton: all 0.3s ease
    }
    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0)
    }
</style>