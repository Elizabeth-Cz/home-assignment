const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// create a user
app.post('/users', async (req, res) => {
  try {
    const {
      employee_number,
      first_name,
      last_name,
      email_address,
      phone_number,
      company_id,
    } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (employee_number,first_name,last_name,email_address,phone_number,company_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        employee_number,
        first_name,
        last_name,
        email_address,
        phone_number,
        company_id,
      ]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all users
app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users');
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a user
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      id,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a user
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      employee_number,
      first_name,
      last_name,
      email_address,
      phone_number,
      company_id,
    } = req.body;

    const updateUser = await pool.query(
      'UPDATE users SET employee_number = $1, first_name = $2, last_name = $3, email_address = $4, phone_number = $5, company_id = $6 WHERE user_id = $7',
      [
        employee_number,
        first_name,
        last_name,
        email_address,
        phone_number,
        company_id,
        id,
      ]
    );

    res.json('User was updated');
  } catch (error) {
    console.error(error.message);
  }
});

// delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      'DELETE FROM users WHERE user_id = $1',
      [id]
    );
    res.json('user deleted');
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
