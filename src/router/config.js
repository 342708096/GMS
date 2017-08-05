import SystemManagement from '@/view/system-management'
import UserManagement from '@/view/user-management'

export default [
  {
    path: '/',
    name: 'home',
    redirect: 'systemManagement'
  },
  {
    path: '/system-management',
    name: 'systemManagement',
    component: SystemManagement,
    meta: {
      menu: '系统管理'
    }
  },
  {
    path: '/user-management',
    name: 'userManagement',
    component: UserManagement,
    meta: {
      menu: '用户管理'
    }
  },
  {
    path: '/video-live',
    name: 'videoLive',
    component: SystemManagement,
    meta: {
      menu: '视频直播'
    }
  },
  {
    path: '/recharge-center',
    name: 'rechargeCenter',
    component: UserManagement,
    meta: {
      menu: '充值中心'
    }
  },
  {
    path: '/order-management',
    name: 'orderManagement',
    component: SystemManagement,
    meta: {
      menu: '工单管理'
    }
  }
]
