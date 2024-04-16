/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2024-03-18 10:07:17
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-18 17:55:12
 * @FilePath: \web\plugins\modals\Phone.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Phone from '@/components/modals/phone/index'


export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const PhoneConstructor = Vue.extend(Phone)
        instance = new PhoneConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$Phone = instance.confirm
    return instance
}
