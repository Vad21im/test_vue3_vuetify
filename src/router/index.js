import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';
import { useAuthStore } from '@/store/authStore';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, // эта страница требует авторизации
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Глобальный навигационный охранник
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Auth' }); 
  } else {
    next(); 
  }
});

export default router;