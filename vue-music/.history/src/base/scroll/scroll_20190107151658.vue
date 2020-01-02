<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll' //代码抽象和复用的目的不用每个组件中都引用
    export default {
        props: {
            probeType: {
                type: Number,
                default: 3
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            }
        },
        data() {
            return {

            }
        },
        mounted() {
            //确保
            setTimeout(()=> {
                this._initScroll();
            }, 20)
        },
        methods: {
            _initScroll() {

            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
