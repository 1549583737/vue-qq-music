<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data= "discList">
            <div>

                <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
                    <slider>
                        <div v-for="(item, index) in recommends" :key="index">
                            <a :href="item.linkUrl">
                                <img  @load="loadImage()" class="needsclick" :src="item.picUrl" alt="">
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
        </scroll>
        <div class="loading-container"></div>
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
            setTimeout(()=> {
                this._getRecommend();
            }, 2000)

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
            },
            //即使recommend有数据了但是没加载图片仍然会高度撑不开，better-scroll滚动无法计算轮播图高度，图片加载完成后再刷新
            loadImage() {
                if(!this.checkLoaded){
                    this.$refs.scroll.refresh();
                    this.checkLoaded = true;
                }
            }
        },
        components: {
            Slider,
            Scroll
        }
    }
</script>

