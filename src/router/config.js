import SystemManagement from '@/view/system-management'

export default [
  {
    path: '/',
    name: 'home',
    redirect: 'SystemManagement'
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
    component: SystemManagement,
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
    component: SystemManagement,
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
