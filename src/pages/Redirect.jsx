import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to the specified page if the user is logged in, otherwise redirect to the login page
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const queryParams = new URLSearchParams(location.search);
    const redirectPage = queryParams.get('redirect') || 'home'; // Default to 'home' if no page specified

    if (jwt) {
      navigate(`/${redirectPage}`);
    } else {
      navigate('/login');
    }
  }, [navigate, location]);

  return (
    <div>
      <p>Redirecting... Please wait..</p>
    </div>
  );
};

export default Redirect;
