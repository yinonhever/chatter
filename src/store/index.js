import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

let logoutTimer;

export default createStore({
    state() {
        return {
            token: null,
            user: null
        }
    },
    mutations: {
        login(state, payload) {
            state.token = payload.token;
            state.user = payload.user;
        },
        logout(state) {
            state.token = null;
            state.user = null;
        },
        updateUser(state, payload) {
            state.user = payload;
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
            const { token, expiresIn, user } = response.data;
            const expirationDate = new Date(Date.now() + expiresIn);
            context.commit("login", { token, user });

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("expirationDate", expirationDate);

            logoutTimer = setTimeout(() => context.dispatch("logout"), expiresIn);
        },
        tryAutoLogin(context) {
            const { token, expirationDate } = localStorage;
            const user = JSON.parse(localStorage.getItem("user"));
            if (!token || !user) return;
            const timeLeft = new Date(expirationDate).getTime() - Date.now();
            if (timeLeft <= 0) {
                context.dispatch("logout");
                return;
            }
            context.commit("login", { token, user });
            logoutTimer = setTimeout(() => context.dispatch("logout"), timeLeft);
        },
        logout(context) {
            context.commit("logout");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("expirationDate");
            clearTimeout(logoutTimer);
            router.push("/login");
        },
        updateUser(context, payload) {
            context.commit("updateUser", payload);
            localStorage.setItem("user", JSON.stringify(payload));
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