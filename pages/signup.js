import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  // Debounced navigation function
  const navigateTo = useCallback(
    debounce((path) => {
      router.push(path);
    }, 1000),
    []
  );

  // Handle form submission for email/password signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error('Phone number must be 10 digits');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Signup successful! Redirecting to login...');
      navigateTo('/login'); // Redirect to login page
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google sign-in successful! Redirecting to dashboard...');
      navigateTo('/dashboard'); // Redirect to dashboard page
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://cdn.pixabay.com/video/2019/05/22/23881-337972830_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm hover:shadow-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm hover:shadow-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-medium mb-1">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm hover:shadow-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-medium mb-1">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm hover:shadow-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-medium mb-1">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm hover:shadow-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all transform hover:scale-105 mb-4"
          >
            Signup
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all transform hover:scale-105"
        >
          Sign in with Google
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
