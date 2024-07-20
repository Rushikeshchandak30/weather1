import dbConnect from '../../../lib/dbconnect';
import User from '../../../models/user';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { token } = req.body;

        const user = await User.findOne({ verificationToken: token });

        if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined; // Clear the token
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error verifying email' });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Invalid request method' });
      break;
  }
}
