import array from "./array/index";
import common from "./common/index";

const obj = {};
Object.assign(obj, common, array);

console.log(obj.getTag({}));
export default obj;
