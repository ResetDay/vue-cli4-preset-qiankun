// 路由分组打包
const index = () => import(/* webpackChunkName: "ajaxDemo" */ './index')

export default [
  {
    path: '/micro/index',
    name: 'micro.index',
    component: index,
    meta: {
      breadcrumb: {
        title: 'micro',
        route: ['micro.index']
      }
    }
  }
]
