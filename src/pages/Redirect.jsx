import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();

  // check if JWT exists in localstorage, redirec to home if does, else redirect to login
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [navigate]);


  return (
    <div>
      <p>Redirecting... Please wait..</p>
    </div>
  );
};

export default Redirect;