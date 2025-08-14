const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get token from arguments or use a sample
const token = process.argv[2];

if (!token) {
  console.log('Usage: node check_token.js <token>');
  console.log('Or check localStorage in browser for the token value');
  process.exit(1);
}

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Token decoded successfully:');
  console.log(JSON.stringify(decoded, null, 2));
} catch (error) {
  console.error('Token verification failed:', error.message);
}
