/*
 *
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug
 * 　　　┃　　　┃　　+
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 *
 */

/*
 * @Author: shdongzhao
 * @Date: 2020-12-29 17:27:49
 * @LastEditors: shidongzhao
 * @LastEditTime: 2020-12-29 18:07:52
 * @Description: 源码文件
 */

import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: './src/index.js',
  output: {
    dir: 'dist',
    name: 'shi',
    format: 'umd',
  },
  plugins: [json(), resolve(), babel({babelHelpers: 'bundled'})],
};
