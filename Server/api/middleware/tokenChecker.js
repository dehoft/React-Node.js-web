const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
  const token = req.headers.authorization.split(" ")[1];
  // decode token
  
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        if (err) {
            return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
        }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}