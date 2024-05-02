<!--
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-10-07 14:52:32
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2023-03-26 02:19:26
 * @FilePath: \xiapaopao\web\components\sidebar\sidebarUploadArticle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="sidear-box">
        <div class="info">
            <div class="btn">
                <h2>内容投递</h2>  
                <a-button @click="go" type="primary">
                    立即投递
                </a-button>
            </div>
            <div class="desc">
                欢迎发布优质内容
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        go(){
           this.$router.push({ path: `/article/create`})
        }
    }
}
</script>

<style lang="less" scoped>
.sidear-box{
    background: white;
    margin-bottom: 10px;
    .info{
        padding: 20px;
        .btn{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            h2{
                font-weight: 700;
                font-size: 16px;
                color: #1d2129;
            }
        }
        .desc{
            font-size: 14px;
            line-height: 22px;
            color: #86909c;
        }
    }
}
</style>