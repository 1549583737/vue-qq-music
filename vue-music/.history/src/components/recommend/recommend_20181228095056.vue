<template>
    <div class="recommend">
        <div class="recommend-content">
            <div v-if="recommends.length > 0" class="slider-wrapper">
                <slider>
                    <div v-for="(item, index) in recommends" :key="index">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul></ul>
            </div>
        </div>
        推荐页面
        <slider></slider>
        <div id="example-4">
            <input type="radio" id="one" value="One" v-model="picked">
            <label for="one">One</label>
            <br>
            <input type="radio" id="two" value="Two" v-model="picked">
            <label for="two">Two</label>
            <br>
            <span>Picked: {{ picked }}</span>
        </div>

    </div>
</template>
<script  type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
    data() {
        return {
            recommends: [],
            picked: ''
        }
    },
    created() {
        this._getRecommend();
    },
    watch: {
        picked(newValue, oldValue) {
            console.log(newValue);
            console.log(oldValue);
            alert("新值"+ newValue);
            alert("旧值"+ oldValue);
        },
        picked: {
            get() {
                alert(this.picked);
            },
            set(newValue) {
                
            }
        }

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