/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2024-03-18 10:07:17
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-18 10:07:52
 * @FilePath: \web\plugins\modals\email.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Email from '@/components/modals/email/index'


export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const EmailConstructor = Vue.extend(Email)
        instance = new EmailConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$Email = instance.confirm
    return instance
}
