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
