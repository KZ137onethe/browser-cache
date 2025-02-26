/**
 * 无缓存中间件
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req
 * @param {Response<any, Record<string, any>, number>} res
 * @param {NextFunction} next
 */
function noCache(req, res, next) {
  res.set({
    "Cache-Control": "no-cache",
  });
  next();
}

module.exports = {
  noCache,
};
