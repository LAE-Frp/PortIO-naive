import {createStore} from 'vuex'
import createPersistedState from '../persistedstate'

export default createStore({
    plugins: [
        createPersistedState({
            key: 'app',
        }),
    ],
    state: {
        "theme_color": "#18A058FF"
    },
    mutations: {
        update_color(state, color) {
            state.theme_color = color
        },
    },
})
