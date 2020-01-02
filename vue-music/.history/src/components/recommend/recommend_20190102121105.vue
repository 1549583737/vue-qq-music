<template>
    <div class="recommend">
        <div class="recommend-content">
            <div class="slider-wrapper">
                
            </div>
        </div>
        <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
                <li>
                    <div class="icon"><img src="" alt=""></div>
                    <div class="text">
                        <h2></h2>
                        <p></p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="loading-container">

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import jsonp from 'common/js/jsonp'
    import {getRecommend} from 'api/recommend'
    imp
    export default {
        data() {
            return {
                discList: [],
                recommends: []
            }
        },
        created() {
            this._getRecommend();
        },
        methods: {
            _getRecommend() {
                getRecommend()
                .then((result)=> {
                    if(result.code === ERR_OK){
                        console.log('Done: ', result);
                        this.discList = result;
                    }

                }).catch((reason)=> {
                    console.log('Failed: ', reason);
                })
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
