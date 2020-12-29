/*
 * @Author: shdongzhao
 * @Date: 2020-12-29 19:40:17
 * @LastEditors: shidongzhao
 * @LastEditTime: 2020-12-29 19:50:52
 * @Description:
 */
import slice from './slice';
const chunk = (array, size) => {
  size = Math.max(size, 0);
  const length = array === null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / size));
  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size));
  }
  return result;
};
export default slice;
