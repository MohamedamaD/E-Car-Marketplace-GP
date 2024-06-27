const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET; 
  
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secretKey, options);
};

module.exports = generateToken;
