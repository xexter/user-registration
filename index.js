import express from 'express';
import mongoose from 'mongoose';

// Import validation middlewares
import { validateName } from './middlewares/validateName.js';
import { validatePassword } from './middlewares/validatePassword.js';
import { validateEmail } from './middlewares/validateEmail.js';
import { validatePhone } from './middlewares/validatePhone.js';

// Import User model
import { User } from './User.js';

const app = express();
app.use(express.json()); // Middleware to parse incoming JSON data

// MongoDB connection setup using Mongoose
const mongoURI = 'mongodb://localhost:27017/userDB';  // Replace with your MongoDB connection string

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Error Handling Middleware
const errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(400).json({ error: err.message });
};

// Route to handle user registration
app.post(
  '/register',
  validateName,
  validatePassword,
  validateEmail,
  validatePhone,
  async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      // Create a new user using the Mongoose model
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      // Save the user to the database
      await newUser.save();

      res.status(200).json({ message: 'User registered successfully!', userId: newUser._id });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while saving user data.' });
    }
  }
);

// Attach error-handling middleware
app.use(errorHandlingMiddleware);

// Start the server
const PORT =3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});