// 此方法是去除虚假值
export const compact = (array) => {
  let resIndex = 0;
  const result = [];
  if (array === null) {
    return result;
  }
  for (const value in array) {
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
};
