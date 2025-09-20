const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const authenticateToken = require('./middleware/auth');


const app = express();
const JWT_SECRET = 'password'
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const db = new Pool({
  user: 'kali',
  host: 'localhost',
  database: 'e102db',
  password: 'kali',
  port: 5432,
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = userResult.rows[0]

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    //create JWT payload
    const payload = { userId: user.id, email: user.email };

    //sign JWT (1 hour expire)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    //send token to front end
    res.json({ token });


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔐 Route: Get current user info using JWT token
app.get('/api/me', authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const result = await db.query(
      'SELECT id, email FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//register user route
app.post('/api/registerUser', async (req, res) => {
  const { email, password, confirm_password, first_name, surname, workplace, phone_number } = req.body;
  if (!email || !password || !confirm_password || !first_name || !surname || !workplace || !phone_number) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }
    if (password.length < 10 || !password.match(/[0-9]/g) || !password.match(/[!"£$%^&*()+{}\[\]@~?<>,./]/g)) {
      return res.status(409).json({ error: 'Your password must be greater than 10 characters, contain a number and special character.' });
    }
    if (password !== confirm_password) {
      return res.status(409).json({ error: 'Your passwords do not match' });
    }

    await db.query(
      `INSERT INTO users (email, password, first_name, surname, place_of_work, contact_number)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [email, password, first_name, surname, workplace, phone_number]
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'));
