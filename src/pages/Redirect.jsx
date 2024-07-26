import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();


  // Add check here for JWT token
  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <p>Redirecting... Please wait..</p>
    </div>
  );
};

export default Redirect;