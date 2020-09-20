import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/Layout'

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/myweixin',
    component: () => import('@/views/myweixin/index'),
    
  },
  {
    path: '/mytenant',
    component: () => import('@/views/mytenant/index'),
    children: [
         { path: '/', component: resolve => require(['@/views/mytenant/index'], resolve)},
         { path: '/mytenant/fee', component: resolve => require(['@/views/mytenant/tenantfee'], resolve) },
         { path: '/mytenant/charge', component: resolve => require(['@/views/mytenant/charge'], resolve) },
         { path: '/mytenant/payment', component: resolve => require(['@/views/mytenant/payment'], resolve) },
         { path: '/mytenant/realgraph', component: resolve => require(['@/views/mytenant/realgraph'], resolve) },
        ]
  },
  {
    path: '/regpremeter',
    component: () => import('@/views/premeter/regpremeter'),
  },
  {
    path: '/premetercharge',
    component: () => import('@/views/premeter/premetercharge'),
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/bind',
    component: () => import('@/views/login/bind'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'user/center',
    children: [
      {
        path: 'center',
        component: () => import('@/views/user/index'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
