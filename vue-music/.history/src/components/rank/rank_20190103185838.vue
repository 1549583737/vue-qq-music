<template>
    <div>
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
    html, body{
        width 100%
        height 100%
    }

    body{
        display:flex
        flex-direction column
    }

    .header, .footer {
        flex: 0 0 80px
        back
    }
</style>