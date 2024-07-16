import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = false; // Replace with your actual authentication check
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return <div className="flex items-center justify-center min-h-screen bg-gray-100">Welcome to the Home Page</div>;
}
