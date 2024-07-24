
function SignupForm() {
    return (
    <section>
        <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="trainer-name">Trainer Name:</label>
            <input type="text" id="trainer-name" name="trainer-name" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" />
            <button type="submit">Sign Up</button>
        </form>
    </section>
    )
}

export default SignupForm;