
import session from 'src/assets/session';

const routes = [
  {
    path: '/',
    component: () => import('layouts/login.vue'),
    beforeEnter: async function (to, from, next) {
      if(session.isAuthenticated()) next({name: "dashboard"})
      next();
  },
    children: [
      { path: '', name: 'login', component: () => import('pages/login/login.vue') }
    ]
  },

  {
    path: '/dashboard',
    component: () => import('layouts/dashboard.vue'),
    beforeEnter: async function (to, from, next) {
        if(!session.isAuthenticated()) next('/')
        next();
    },
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/dashboard/dashboard.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
