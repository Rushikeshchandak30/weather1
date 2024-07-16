import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = false; // Replace with your actual authentication check
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [router]);

    return <Component {...props} />;
  };
}
