import Vue from 'vue'
import EditForum from '@/components/modals/editFourm'
export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const EditForumConstructor = Vue.extend(EditForum)
        instance = new EditForumConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$EditForum = instance.confirm
    return instance
}