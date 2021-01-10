import { createApp } from "vue";
import router from "./router";
import store from "./store";

import App from "./App.vue";
import Page from "./components/Page";
import BaseButton from "./components/BaseButton";
import ExternalLink from "./components/ExternalLink";
import AuthForm from "./components/AuthForm";
import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";

const app = createApp(App);

app.component("Page", Page);
app.component("BaseButton", BaseButton);
app.component("ExternalLink", ExternalLink);
app.component("AuthForm", AuthForm);
app.component("Spinner", Spinner);
app.component("ErrorMessage", ErrorMessage);

app.use(store);
app.use(router);

app.mount("#app");
