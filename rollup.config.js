import ts from 'rollup-plugin-typescript2'; // 解析ts的插件
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 解析第三方模块插件 @表示是官方维护的包
import serve from 'rollup-plugin-serve'; // 启动本地服务插件
import path from 'path';

// rollup支持es6语法
export default {
  input: 'src/index.ts',
  output: {
    // amd iife commonjs umd
    format: 'iife', //  打包成一子执行函数
    file: path.resolve(__dirname, 'dist/bundle.js'), // 出口文件
    // 希望能看到源码 根据源码产生映射文件
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      // 第三方解析插件
      extensions: ['.js', '.ts'],
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
    serve({
      open: true,
      port: 3001,
      openPage: 'public/index.html',
      contentBase: '',
    }),
  ],
};
