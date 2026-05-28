import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/projects/:slug', name: 'projects.show', component: ProjectDetailView, props: true },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'smooth' };
    }

    return { top: 0 };
  },
});
