const jwt = require('jsonwebtoken');

const JWT_SECRET = 'password'; // Replace with your secret or use an env variable

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting: "Bearer <token>"
  console.log('Received token', token);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user; // userId and email from token
    next();
  });
}

module.exports = authenticateToken;
