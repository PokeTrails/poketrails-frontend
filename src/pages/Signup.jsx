import AppLogo from "../components/AppLogo";
import SignupForm from "../components/SignupForm";

function Signup(){
    return(    
        <>
        <AppLogo />
        <SignupForm />
        <p>
            Already have an account? Log in <a href="/">here</a>
        </p>
    </>
    )
}

export default Signup;