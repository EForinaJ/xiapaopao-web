import Vue from 'vue'
import Reservation from '@/components/modals/reservation/Reservation'


export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const ReservationConstructor = Vue.extend(Reservation)
        instance = new ReservationConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$Reservation = instance.confirm
    return instance
}
