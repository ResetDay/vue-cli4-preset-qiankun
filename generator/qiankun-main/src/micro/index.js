// 为 Angular 微应用所做的 zone 包注入
// 如果没有 Angular 微应用，请删除这行代码
// import 'zone.js';
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start
} from 'qiankun';

// 子应用注册信息
import apps from './apps';

/**
 * 注册子应用
 * 第一个参数 - 子应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps, {
  // qiankun 生命周期钩子 - 加载前
  beforeLoad: (app, any) => {
    // 加载子应用前，加载进度条
    console.log('before load', app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子 - 挂载后
  afterMount: (app, any) => {
    // 加载子应用前，进度条加载完成
    console.log('after mount', app.name);
    return Promise.resolve();
  }
});

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event) => {
  console.error(event);
});

// 导出 qiankun 的启动函数
export default start;
