/**
 * 转化响应标头中的CacheControl为对象
 * @param {Headers} headers - Headers对象
 * @returns object
 * @example { 'max-age': 100, public: true }
 */
function getCacheControlContent(headers) {
  const data = {};
  const headersArr = headers
    .get("Cache-Control")
    .split(",")
    .map((item) => item.split("="));
  headersArr.forEach((item) => {
    const [key, val] = item;
    if (val !== undefined) {
      data[key] = val;
    } else {
      data[key] = true;
    }
  });
  return data;
}

export { getCacheControlContent };
