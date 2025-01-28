import express from 'express';
const router = express.Router();
import User from '../models/User.js';

// Getting all
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post('/', async (req, res) => {
  try {
    const {
      name,
      familyName,
      userName,
      email,
      birthDate,
      pass,
      gender,
      phone,
      favoriteTeam,
    } = req.body;

    if (
      !name ||
      !familyName ||
      !userName ||
      !email ||
      !birthDate ||
      !pass ||
      !gender ||
      !favoriteTeam ||
      !phone
    ) {
      // handel if data is empty
      return res.status(400).json({ message: 'please enter valid data' });
    }

    const existingEmail = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });
    const existingUserName = await User.findOne({ userName });
    if (existingEmail) {
      return res.status(400).json({ message: 'user already exist' });
    }
    if (existingPhone) {
      return res.status(400).json({ message: 'user already exist' });
    }
    if (existingUserName) {
      return res.status(400).json({ message: 'user already exist' });
    }

    const newUser = await User.create({
      name,
      familyName,
      userName,
      email,
      birthDate,
      pass,
      gender,
      phone,
      favoriteTeam,
    });

    res.status(201).json({ message: 'user created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Update fields based on request body
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.familyName) {
      user.familyName = req.body.familyName;
    }
    if (req.body.userName) {
      user.userName = req.body.userName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.bio === '' || req.body.bio) {
      user.bio = req.body.bio;
    }
    if (req.body.yourLink === '' || req.body.yourLink) {
      user.yourLink = req.body.yourLink;
    }
    if (req.body.link === '' || req.body.link) {
      user.link = req.body.link;
    }
    if (req.body.birthDate) {
      user.birthDate = req.body.birthDate;
    }
    if (req.body.pass) {
      const isValid = await bcrypt.compare(req.body.oldPass, user.pass);
      if (!isValid) {
        return res.status(400).json({ message: 'Old password is wrong!' });
      }
      user.pass = req.body.pass;
    }
    if (req.body.gender) {
      user.gender = req.body.gender;
    }
    if (req.body.phone) {
      user.phone = req.body.phone;
    }
    if (req.body.favoriteTeam) {
      user.favoriteTeam = req.body.favoriteTeam;
    }
    if (req.body.predictions) {
      user.predictions.push(req.body.predictions);
    }
    if (req.body.role) {
      user.role = req.body.role;
    }

    await user.save();
    res.status(201).json({ message: 'user Updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
