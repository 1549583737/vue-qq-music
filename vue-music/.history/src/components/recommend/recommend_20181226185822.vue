<template>
    <div class="recommend">
        <div class="recommend-content">
            <div class="slider-wrapper">
                <slider>
                    <div v-for="item in recommends">

                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul></ul>
            </div>
        </div>
        推荐页面
        <Slider></Slider>
    </div>
</template>
<script  type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
    data() {
        return {
            recommends: []
        }
    },
    created() {
        this._getRecommend();
    },

    methods: {
        _getRecommend() {
            getRecommend().then((res) => {
                if(res.code === ERR_OK) {
                    this.recommends = res.data.slider;
                }
            })
        }
    },

    components: {
        Slider
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    

</style>