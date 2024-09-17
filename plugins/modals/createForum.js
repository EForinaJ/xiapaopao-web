import Vue from 'vue'
import CreateForum from '@/components/modals/createForum'
export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const CreateForumConstructor = Vue.extend(CreateForum)
        instance = new CreateForumConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$CreateForum = instance.confirm
    return instance
}