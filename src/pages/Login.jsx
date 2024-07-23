import AppLogo from '../components/AppLogo';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <>
        <AppLogo />
        <LoginForm />
        <p>
            Don't have an account? Sign up <a href="./signup">here</a>
        </p>
        <p>
            <a href="mailto:support@poketrails.tech">Forgot your password?</a>
        </p>
    </>
  )
}

export default Login;
