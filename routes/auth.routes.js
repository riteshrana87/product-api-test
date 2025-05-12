const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Dummy user data (simulate DB user)
const dummyUser = {
  id: '1',
  username: 'admin',
  password: bcrypt.hashSync('password', 8), // hashed version of 'password'
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate credentials
  if (
    username !== dummyUser.username ||
    !bcrypt.compareSync(password, dummyUser.password)
  ) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign(
    { id: dummyUser.id, username: dummyUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
});

module.exports = router;
