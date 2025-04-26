export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 3840, // 基准宽度，对应设计稿宽度
      viewportHeight: 2160, // 基准高度
      unitPrecision: 3, // 转换后的精度
      viewportUnit: 'vw', // 转换后的单位
      selectorBlackList: ['.ignore-'], // 不转换的选择器
      minPixelValue: 1, // 小于等于1px的不转换
      mediaQuery: false, // 媒体查询中的px不转换
      landscape: false // 是否处理横屏情况
    },
    tailwindcss: {},
    autoprefixer: {}
  }
}
