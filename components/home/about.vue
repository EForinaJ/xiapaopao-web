<template>
    <div class="widget">
        <div class="desc">
            本站只作功能演示之用。严禁发布低俗、违法、涉及政治的内容。
        </div>
        <div class="system">
            <div class="text">
                系统授权获取
            </div>
            <a-icon type="right" />
        </div>
        <div class="desc">
            如果发现有人使用本程序从事违法活动，请举报：
            973728679@qq.com
        </div>
        <div class="procy">
            用户协议
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.widget{
    background: white;
    padding: 15px;
    border-radius: 4px;
    .desc{
        margin-bottom: 10px;
        font-size: 13px;
        line-height: 16px;
    }
    .system{
        margin: 20px 0;
        display: flex;
        align-items: center;
        .text{
            cursor: pointer;
            margin-right: 10px;
        }
    }
    .procy{
        margin-top: 10px;
        font-size: 13px;
        font-weight: 600;
        color: #fa3534;
    }
}
</style>