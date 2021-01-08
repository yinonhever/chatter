import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

export default createStore({
    state: {
        token: null,
        user: null
    },
    mutations: {
        login(state, payload) {
            state.token = payload.token;
            state.user = payload.user;
        },
        logout(state) {
            state.token = null;
            state.user = null;
        }
    },
    actions: {
        async auth(context, payload) {
            const { mode, data } = payload;
            let url;
            if (mode === "signup") {
                url = "http://localhost:5000/api/users";
            } else if (mode === "login") {
                url = "http://localhost:5000/api/users/login";
            }

            const response = await axios.post(url, data);
            const { token, user } = response.data;
            context.commit("login", { token, user });

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        },
        tryAutoLogin(context) {
            const { token } = localStorage;
            const user = JSON.parse(localStorage.getItem("user"));
            if (!token || !user) return;
            context.commit("login", { token, user });
        },
        logout(context) {
            context.commit("logout");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.replace("/login");
        }
    },
    getters: {
        isAuth(state) {
            return state.token && state.user;
        },
        token(state) {
            return state.token;
        },
        user(state) {
            return state.user;
        }
    }
});