import {
  basic,
  // view,
  user
} from '@/layouts'
export const asyncRouterMap = [{
    path: '/',
    name: 'index',
    redirect: '/dashboard',
    component: basic,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/home/Index'),
        hidden: false,
        meta: {
          title: '首页',
          icon: 'home',
          permission: 'dashboard_index'
        }
      },
      {
        path: '/dashboard2',
        name: 'dashboard2',
        component: () => import('@/views/home/Index2'),
        hidden: false,
        meta: {
          title: '首页',
          icon: 'home',
          permission: 'dashboard_index'
        }
      },
      // {
      //   path: '/dashboard4',
      //   name: 'dashboard4',
      //   component: () => import('@/views/home/Index4'),
      //   hidden: false,
      //   meta: {
      //     title: '首页',
      //     icon: 'home',
      //     permission: 'dashboard_index'
      //   }
      // },
      {
        path: '/nine',
        name: 'nine',
        component: () => import('@/views/home/ninePage'),
        hidden: false,
        meta: {
          title: '选择题9',
          icon: 'home',
          permission: 'dashboard_index'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const constantRouterMap = [{
    path: '/user',
    component: user,
    redirect: '/user/login',
    hidden: true,
    children: [{
      path: 'login',
      name: 'login',
      component: () => import( /* webpackChunkName: "user" */ '@/views/user/Login')
    }, ]
  },
  {
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]