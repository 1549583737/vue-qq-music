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
            //确保dom渲染
            setTimeout(()=> {
                this._initScroll();
            }, 20)
        },
        methods: {
            _initScroll() {
                if(!this.$refs.wrapper){
                    return;
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
            },
            // 方法的代理
            enable() {
                this.scroll && this.scroll.enbale()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            }
        },
        watch: {
            data() {
                setTimeout()
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
