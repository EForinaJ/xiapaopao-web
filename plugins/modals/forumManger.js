import Vue from 'vue'
import ForumManger from '@/components/modals/forumManger'
export default ({store,app: { $axios,$cookies,router}}) => {
    
    let instance
    if (!instance) {
        const ForumMangerConstructor = Vue.extend(ForumManger)
        instance = new ForumMangerConstructor({store,$axios,$cookies,router})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$ForumManger = instance.confirm
    return instance
}