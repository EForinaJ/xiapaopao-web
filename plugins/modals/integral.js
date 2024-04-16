import Vue from 'vue'
import Integral from '@/components/modals/integral/index'


export default ({store,app: { $axios,$cookies}},) => {
    let instance
    if (!instance) {
        const IntegralConstructor = Vue.extend(Integral)
        instance = new IntegralConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }

    Vue.prototype.$Integral = instance.confirm
    // inject('payModal', instance.confirm)
    return instance
}
