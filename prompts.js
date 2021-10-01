module.exports = [
  {
    name: 'type',
    type: 'list',
    message: '请选择模板类型',
    choices: [
      {
        name: 'PC端',
        value: 'pc'
      },
      {
        name: '移动端',
        value: 'm'
      },
      {
        name: 'qiankun-Vue主应用-默认',
        value: 'main'
      },
      {
        name: 'qiankun-Vue微应用-默认',
        value: 'sub'
      },
      {
        name: 'qiankun-Vue微应用-水平导航栏',
        value: 'main-horizontal'
      }
    ],
    default: 'sub'
  }
]
