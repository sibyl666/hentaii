import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

interface LoginPayload {
  username: string,
  password: string,
  token: string
}

interface User {
  username?: string,
  permissions?: string[],
  favorites?: string[]
}

interface FavoriteParams {
  id: string
}

export default createStore({
  plugins: [createPersistedState()],
  state: {
    user: <User>{}
  },
  mutations: {
    SET_USER(state, value) {
      state.user = value;
    },
    DEL_USER(state) {
      state.user = {};
    },
    ADD_FAVORITE(state, value) {
      if (!state.user.favorites ) {
        state.user.favorites = [];
      }
      state.user.favorites?.push(value);
    },
    DEL_FAVORITE(state, value) {
      let index = state.user.favorites?.indexOf(value);
      if (!index) return;
      state.user.favorites?.splice(index, 1);
    }
  },
  actions: {
    async login({ commit }, { username, password, token }: LoginPayload) {
      await axios.post("/auth/login", { username, password, token }, {
        withCredentials: true
      });

      const resp = await axios.get("/auth/me", { withCredentials: true });
      commit("SET_USER", resp.data);
    },
    async logout({ commit }) {
      commit("DEL_USER");

      await axios.post("/auth/logout", null, { withCredentials: true });
    },
    async update({ commit }) {
      const resp = await axios.get("/auth/me", { withCredentials: true });
      commit("SET_USER", resp.data);
    },
    async addFavorite({ commit }, { id }: FavoriteParams) {
      commit("ADD_FAVORITE", id);
    },
    async delFavorite({ commit }, { id }: FavoriteParams) {
      commit("DEL_FAVORITE", id);
    }
  },
  getters: {
    isFavorited: (state) => (id: string) => state.user.favorites?.includes(id)
  }
})
