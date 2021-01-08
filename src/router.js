import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

import Login from "./views/Login";
import Signup from "./views/Signup";
import Explore from "./views/Explore";
import Profile from "./views/Profile";
import MyProfile from "./views/MyProfile";
import EditProfile from "./views/EditProfile";
import MyChats from "./views/MyChats";
import Chat from "./views/Chat";
import NotFound from "./views/NotFound";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: "/", redirect: store.getters.isAuth ? "/explore" : "/login" },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/explore", component: Explore, meta: { protected: true } },
    { path: "/profile", component: MyProfile, meta: { protected: true } },
    { path: "/profile/:userId", component: Profile, meta: { protected: true }, props: true },
    { path: "/edit-profile", component: EditProfile, meta: { protected: true } },
    { path: "/chats", component: MyChats, meta: { protected: true } },
    { path: "/chats/:addressUserId", component: Chat, meta: { protected: true }, props: true },
    { path: "/:notFound(.*)", component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.protected && !store.getters.isAuth) next("/login");
  else if (
    (to.path === "/login" || to.path === "/signup") &&
    store.getters.isAuth
  ) next("/explore");
  else next();
});

export default router;
