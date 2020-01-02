<template>
    <div class="rank">
        排行页面
        <div class="header"></div>
        <div class="container">
            <div class="left"></div>
            <div class="main"></div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script  type="text/ecmascript-6">

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    *{
        margin: 0
        padding: 0
    }
    .rank{
        width 370px
        height 460px
    }

    .rank{
        display:flex
        flex-direction column
    }

    .header, .footer {
        flex: 0 0 80px
        background-color #7dbcea
    }

    .container
        flex: auto
        background-color #145d9c
        display flex

    .container .left, .container .right 
        flex 0 0 100px
        flex 0 0 100px
        background-color #3a90ce

    .container .main
        flex auto 
        background-color #145d9c
</style>