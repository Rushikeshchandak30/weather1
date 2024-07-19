// /api/auth/signup.js
import dbConnect from '../../../lib/dbconnect';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { email, password, confirmPassword, phone, address } = req.body;

        if (!email || !password || !confirmPassword || !phone || !address) {
          res.status(400).json({ success: false, message: 'All fields are required' });
          return;
        }

        if (password !== confirmPassword) {
          res.status(400).json({ success: false, message: 'Passwords do not match' });
          return;
        }

        if (!/^\d{10}$/.test(phone)) {
          res.status(400).json({ success: false, message: 'Phone number must be 10 digits' });
          return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          email,
          password: hashedPassword,
          phone,
          address,
        });

        await user.save();
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Invalid request method' });
      break;
  }
}
