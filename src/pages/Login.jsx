import appLogo from '../assets/app_logo.png';

function Login() {

  return (
    <>
    <img src={appLogo} alt="Application Logo" />
    <section>
        <h1>Login</h1>
        <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
    </section>
    <p>
      Don't have an account? Sign up <a href="./Signup">here</a>
    </p>
    <p>
      <a href="mailto:support@poketrails.tech">Forgot your password?</a>
    </p>
    </>
  )
}

export default Login
