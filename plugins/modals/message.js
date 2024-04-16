import Vue from 'vue'
import Message from '@/components/modals/message'


export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const MessageConstructor = Vue.extend(Message)
        instance = new MessageConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$Message = instance.confirm
    return instance
}
