import SystemManagement from '@/view/system-management'
import UserManagement from '@/view/user-management'
import Vod from '@/view/vod'
import Full from '@/Full'
import App from '@/App'
import Login from '@/Login'
import Register from '@/Register'

export default [
  {
    path: '/',
    name: 'home',
    component: Full,
    redirect: '/system-management',
    meta: {
      menu: 'home'
    },
    children: [
      {
        path: 'system-management',
        name: 'systemManagement',
        component: App,
        meta: {
          icon: 'icon-puzzle',
          menu: '系统管理'
        },
        children: [
          {
            path: 'company-management',
            name: 'companyManagement',
            component: UserManagement,
            meta: {
              icon: 'icon-puzzle',
              menu: '企业管理'
            }
          },
          {
            path: 'user-authentication',
            name: 'userAuthentication',
            component: UserManagement,
            meta: {
              icon: 'icon-puzzle',
              menu: '用户认证'
            }
          },
          {
            path: 'company-user',
            name: 'companyUser',
            component: UserManagement,
            meta: {
              icon: 'icon-puzzle',
              menu: '企业用户'
            }
          }
        ]
      },
      {
        path: 'user-management',
        name: 'userManagement',
        component: UserManagement,
        meta: {
          icon: 'icon-puzzle',
          menu: '用户管理'
        }
      },
      {
        path: 'video-live',
        name: 'videoLive',
        component: SystemManagement,
        meta: {
          icon: 'icon-puzzle',
          menu: '视频直播'
        }
      },
      {
        path: 'video-vod',
        name: 'videoVod',
        component: Vod,
        meta: {
          icon: 'icon-puzzle',
          menu: '视频录播'
        }
      },
      {
        path: 'recharge-center',
        name: 'rechargeCenter',
        component: UserManagement,
        meta: {
          icon: 'icon-puzzle',
          menu: '充值中心'
        }
      },
      {
        path: 'order-management',
        name: 'orderManagement',
        component: SystemManagement,
        meta: {
          icon: 'icon-puzzle',
          menu: '工单管理'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]
