export const eq = (value, other) => {
  return value === other || (value !== value && other !== other); // 后半句用来判断NaN的
};
