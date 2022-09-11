const jwt = require("jsonwebtoken");
const privateKey =
  "8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb";

const generateAuthToken = function (id) {
  const token = jwt.sign(
    {
      _id: id,
    },
    privateKey,
    { expiresIn: "24h" }
  );

  return token;
};

module.exports = generateAuthToken;
