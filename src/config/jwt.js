const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * * generates auth token
   * @param {object} payload
   */
  generateToken: (payload) => {
    const token = jwt.sign(payload, "jwtSecret", { expiresIn: "1d" });
    return {
      status: token ? 200 : 400,
      message: token ? "Token generated" : "Token not generated",
      data: token && `Bearer ${token}`,
    };
  },

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  extractFromAuthHeader: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({
          status: 401,
          message: "token not provided",
        });
      }

      const [Bearer, token] = authorization.split(" ");
      if (Bearer !== "Bearer") {
        return res.status(400).json({
          status: 400,
          message: "invalid token",
        });
      }

      const decodedData = jwt.verify(token, "jwtSecret");
      req.user = decodedData;
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: "error extracting bearer token",
        error: err.message,
      });
    }
  },
};
