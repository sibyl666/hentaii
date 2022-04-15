import { createApp } from 'vue';
import App from './App.vue';
import "./index.css";

import Store from "./store/store";
import Router from "./router/router";

import axios from "axios";
axios.defaults.baseURL = import.meta.env.DEV ? "http://localhost:4000/api" : "https://hentaii.xyz/api";

createApp(App)
.use(Store)
.use(Router)
.mount('#app');
