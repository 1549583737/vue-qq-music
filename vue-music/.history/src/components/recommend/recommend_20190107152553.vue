<template>
    <div class="recommend" ref="recommend">
        <scroll class="recommend-content">
            <div>

                <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
                    <slider>
                        <div v-for="(item, index) in recommends" :key="index">
                            <a :href="item.linkUrl">
                                <img class="needsclick" :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
       

                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="(item, index) in discList.list" :key="index" class="item">
                            <div class="icon"><img width="60" height="60" :src="item.imgurl" alt=""></div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            

        <div class="loading-container"></div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import jsonp from 'common/js/jsonp'
    import Slider from 'base/slider/slider'
    import Scroll from 'base/scroll/scroll' 
    import {getRecommend, getDiscList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    export default {
        data() {
            return {
                discList: [],
                recommends: []
            }
        },
        created() {
            this._getRecommend();
            this._getDiscList();
        },
        methods: {
            _getRecommend() {
                getRecommend()
                .then((result)=> {
                    if(result.code === ERR_OK){
                        console.log('Done: ', result);
                        this.recommends = result.data.slider;
                    }

                }).catch((reason)=> {
                    console.log('Failed: ', reason);
                })
            },
            _getDiscList() {
                getDiscList().then((result)=> {
                    if(result.code === ERR_OK){
                        console.log('Done: ', result);
                        this.discList = result.data;
                    }
                }).catch((reason)=> {
                    console.log('Failed: ', reason);
                })
            }
        },
        components: {
            Slider,
            Scroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .recommend
        .recommend-list
            h1.list-title
                height 65px
                line-height 65px
                font-size 14px
                text-align center
                color #ffcd32
            ul
                li.item
                    display flex
                    padding 0 20px 20px 20px
                    align-items center
                    box-sizing border-box
                    div.icon
                        flex 0 0 60px
                        width 60px
                        padding-right 20px 
                    div.text
                        display flex
                        flex-direction column
                        justify-content center
                        flex 1
                        line-height 20px
                        font-size 14px
                        .name
                            margin-bottom 10px
                            color #ffffff
                        .desc    
                            color rgba(255, 255, 255, .3)   

       
</style>
