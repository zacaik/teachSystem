module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  // 允许的地址,http://127.0.0.1:9000这样的格式
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === "POST" && req.path === "/login") {
    console.log(req.body)

    if (req.body.phone === "123" && req.body.password === "123456") {
      return res.status(200).json({
        token: "123",
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
};