<!--
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-10-07 14:52:32
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2023-07-02 17:42:39
 * @FilePath: \web\layouts\error.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <a-result status="404" title="404" sub-title="页面不存在">
      <template #extra>
        <nuxt-link to="/">
          <a-button type="primary">
            回到首页
          </a-button>
        </nuxt-link>
      </template>
    </a-result>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  props: ['error'],
  // layout: 'blog', // 你可以为错误页面指定自定义的布局
  head(){
      return this.$seo(`404页面未找到-${this.base.title}`,`404页面未找到`,[{
          hid:"xiapaopao",
          name:"description",
          content:`404页面未找到`
      }])
  },
  computed:{
      ...mapState(["design","base"])
  },
}
</script>

<style lang="less" scoped>
.container{
    margin: 40px 0;
    min-height: 100vh;
    .account-content{
        display: flex;
        justify-content: center;
        .warper{
            width: 100%;
            .account-router{
                margin: 10px 0;
            }
        }
    }
}

// 响应式处理
@media only screen and (max-width: 768px) {
  .container{
    .account-content{
      .warper {
        width: 100% !important;
      }
    }
  }
}
</style>