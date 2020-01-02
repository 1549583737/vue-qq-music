<template>
    <div class="song-list">
        <ul>
            <li v-for="(song, index) in songs" :key="index" class="item">
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc"></p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            }
        },
        methods: {
            getDesc(song) {
                return `${songs.s`
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
</style>
