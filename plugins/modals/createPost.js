import Vue from 'vue'
import CreatePost from '@/components/modals/createPost'
export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const CreatePostConstructor = Vue.extend(CreatePost)
        instance = new CreatePostConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$CreatePost = instance.confirm
    return instance
}