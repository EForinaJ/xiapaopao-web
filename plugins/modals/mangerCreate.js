import Vue from 'vue'
import MangerCreate from '@/components/modals/mangerCreate'
export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const MangerCreateConstructor = Vue.extend(MangerCreate)
        instance = new MangerCreateConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$MangerCreate = instance.confirm
    return instance
}