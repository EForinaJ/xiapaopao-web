import Vue from 'vue'
import Withdraw from '@/components/modals/withdraw'
export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const WithdrawConstructor = Vue.extend(Withdraw)
        instance = new WithdrawConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$Withdraw = instance.confirm
    return instance
}