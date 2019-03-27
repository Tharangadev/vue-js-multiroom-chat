import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        room_data: {
            rooms: "",
            users: ""
        },
        messages: []
    },
    getters: {
        channel_list: state => state.room_data,
        users: state => state.users

    },
    mutations: {
        adding_roomdata(state, room_data) {
            state.room_data = room_data
        },
        addmessages(state, message) {
            state.messages.push(message)
        },
        clearmessages(state) {
            state.messages = []
        }
    },
    actions: {
        adding_roomdata(context, room_data) {
            context.commit('adding_roomdata', room_data)
        },
        common_message(context, message) {
            context.commit('addmessages', message)
        },
        clearnthemessages(context) {
            context.commit('clearmessages')
        }
    }
})

export default store