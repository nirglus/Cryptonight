function SignUp(props){
    return(
        <div className="signUpComp">
        <form onSubmit={props.submitHandler}>
            <label htmlFor="email">Enter your email:</label>
            <input type="email" name="email" onChange={props.changeHandler}/>
            <label htmlFor="password">Enter your password:</label>
            <input type="password" name="password" onChange={props.changeHandler}/>
            <button className="button" type="submit">Register</button>
        </form>
        </div>
    )
}

export default SignUp;