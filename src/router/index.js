import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePageView.vue'
import Dashboard from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router
