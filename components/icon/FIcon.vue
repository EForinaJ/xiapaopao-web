<!--
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-10-07 14:52:32
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-18 00:35:14
 * @FilePath: \web\components\icon\FIcon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <FIcon 
  :style="{fontSize:size+'px',color:color}" 
  :type="type" />
</template>

<script>
// <FIcon :size="14" type="icon-tupian_huaban"/>

import { Icon } from 'ant-design-vue';
const FIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4174995_k5z6g0ics7.js',
});
export default {
  props:{ 
    type:{
      type: String, //指定传入的类型
      default: "" //这样可以指定默认的值
    },
    size:{
      type: Number, //指定传入的类型
      default: 20 //这样可以指定默认的值
    },
    color:{
      type: String, //指定传入的类型
      default: "rgb(255, 255, 255)" //这样可以指定默认的值
    },
  },
  components:{
    FIcon
  }
}
</script>