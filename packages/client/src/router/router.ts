import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

// Views
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Upload from "../views/Upload.vue";
import Manga from "../views/Manga.vue";
import Read from "../views/Read.vue";
import Search from "../views/Search.vue";
import Favorites from "../views/Favorites.vue";

const router = createRouter({
  routes: [
    {
      name: "Home",
      path: "/",
      component: Home,
    },
    {
      name: "Login",
      path: "/login",
      component: Login,
    },
    {
      name: "Upload",
      path: "/upload",
      component: Upload,
    },
    {
      name: "Manga",
      path: "/manga/:id",
      component: Manga,
      props: true,
    },
    {
      name: "Read",
      path: "/manga/:id/:page",
      component: Read,
      props: true
    },
    {
      name: "Search",
      path: "/search",
      component: Search,
      props: true,
    },
    {
      name: "Favorites",
      path: "/favorites",
      component: Favorites,
    }
  ],
  history: createWebHistory(),
  scrollBehavior: (to, _, savedPosition) => {
    if (to.name == "Mange") {
      return {
        top: 0
      }
    }

    return {
      top: savedPosition?.top || 0
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.name?.toString().toUpperCase() == "UPLOAD") {
    if (!store.state.user.permissions?.includes("UPLOAD")) {
      next({ name: "Home" });
      return
    }
  }

  next();
})

export default router;
