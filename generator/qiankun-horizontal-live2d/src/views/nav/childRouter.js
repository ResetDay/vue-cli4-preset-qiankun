// 路由分组打包
const nav1 = () => import(/* webpackChunkName: "home" */ './index/nav1')
const nav2 = () => import(/* webpackChunkName: "home" */ './index/nav2')
export default [
  {
    path: '/',
    name: 'nav1.index',
    component: nav1
  },
  {
    path: '/nav2',
    name: 'nav2.index',
    component: nav2
  }
]
