import { ActionTree, MutationTree, GetterTree } from "vuex/types/index";

const API_URL = process.env.API_URI;

export const state = () => {
    return {
        users: {},
    }
};

export const getters: GetterTree<any, any> = {
    getAllUsers(state) {
        return state.users;
    },
}

export const mutations: MutationTree<any> = {
    setUsers(state, payload) {
        state.users = payload
    },
}

export const actions: ActionTree<any, any> = {
    async createUser({ commit }, body) {
        const user = await this.$axios.$post(`${API_URL}`, body)
        return user;
    },
    async getUsers({ commit }) {
        const users = await this.$axios.$get(`${API_URL}`)
        commit('setUsers', users.attributes)
        return users;
    },
    async deleteUser({ commit }, id) {
        const result = await this.$axios.$post(`${API_URL}?_id=${id}`)
        return result;
    },
}