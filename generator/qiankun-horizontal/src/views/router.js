import { importAll } from '@/utils/routerHelper.js';
import index from './layout';

// 加载子路由
const ctx = require.context('./', true, /childRouter.js$/);
const childRoutes = importAll(ctx);

export default {
  path: '/',
  redirect: '/',
  component: index,
  children: childRoutes
}
