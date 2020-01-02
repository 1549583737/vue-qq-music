<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll' //代码抽象和复用的目的不用每个组件中都引用
    export default {
        props: {
            proto
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
