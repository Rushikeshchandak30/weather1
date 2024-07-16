import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/globals.css';
import jwt from 'jsonwebtoken';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      } catch (error) {
        if (router.pathname !== '/login') {
          router.push('/signup'); // Redirect to login if the token is invalid
        }
      }
    } else {
      if (router.pathname !== '/login' && router.pathname !== '/signup') {
        router.push('/login'); // Redirect to login if no token is found
      }
    }
  }, [router]);//.pathname

  return <Component {...pageProps} />;
}

export default MyApp;
