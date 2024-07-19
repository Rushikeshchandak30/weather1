import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
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
      <div className="relative bg-white p-10 rounded-lg shadow-lg w-full max-w-md z-10">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6 transition-transform transform hover:scale-105 hover:text-gray-900 hover:shadow-xl">
          Welcome to Weather App
        </h1>
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-700 transition-transform transform hover:scale-105 hover:text-gray-800">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-800 text-lg font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-md hover:shadow-lg"
            />
          </div>
          <div className="mb-7">
            <label className="block text-gray-800 text-lg font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-md hover:shadow-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all transform hover:scale-105"
          >
            Login
          </button>
          <div className="text-center mt-5">
            <p className="text-gray-800">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={goToSignup}
                className="text-blue-500 hover:text-blue-600 focus:outline-none font-medium"
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
