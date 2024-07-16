import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

        setIsAuthenticated(true);
        router.push('/weather'); // Redirect to weather page if authenticated
      } catch (error) {
        router.push('/signup'); // Redirect to weather page if token is invalid
      }
    } else {
      router.push('/login'); // Redirect to login if no token is found
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner, etc.
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <p>Welcome to the Dashboard!</p>
      </div>
    </div>
  );
}
