import dbConnect from '../../../lib/dbconnect';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
          expiresIn: '10m',  // Change expiresIn to 10 minutes
        });

        res.status(200).json({ success: true, token });
      } catch (error) {

        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
