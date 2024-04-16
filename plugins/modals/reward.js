import Vue from 'vue'
import Reward from '@/components/modals/reward'


export default ({store,app: { $axios,$cookies}},) => {
    let instance
    if (!instance) {
        const RewardConstructor = Vue.extend(Reward)
        instance = new RewardConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }

    Vue.prototype.$Reward = instance.confirm
    return instance
}
