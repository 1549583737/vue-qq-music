<template>
    <div class="recommend">
        div.recommend-content>div.slider-wrapper+div.recommend-list
        推荐页面
        <Slider></Slider>
    </div>
</template>
<script  type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {

    created() {
        this._getRecommend();
    },

    methods: {
        _getRecommend() {
            getRecommend().then((res) => {
                if(res.code === ERR_OK) {
                    console.log(res.data.slider);
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