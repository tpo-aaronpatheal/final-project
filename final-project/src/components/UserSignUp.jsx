import React, { useContext, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Context from '../context';
import api from '../utils/api.js';
import ValidationError from './ValidationError';
import '../styles/style.css';
import {useSpring, animated } from 'react-spring';

const UserSignUp = () => {

     const fade = useSpring({
         from: {
             opacity: 0
         },
         to: {
             opacity: 1
         },
        config: { duration: 3000 }
     });

    const { value } = useContext(Context);
    const history = useHistory();

    const firstNameInput = useRef('');
    const lastNameInput = useRef('');
    const emailInput = useRef('');
    const passwordInput = useRef('');
    const confirmPasswordInput = useRef('');

    //creates user based upon inputs and encodes password
    const createUser = async () => {
        const encodedPassword = btoa(passwordInput.current.value);
        await api.postCreateUser('users', firstNameInput.current.value, lastNameInput.current.value, emailInput.current.value, passwordInput.current.value);
        
        const response = await api.getUser('users', emailInput.current.value, encodedPassword);
        const { data: {  id, name, email } } = response;

        value.actions.setUser({
            authenticated: true,
            id,
            email,
            userName: name,
            password: encodedPassword,
        });

        history.push('/');
    }

    //sets custom validation to password and confirm password fields
    const validatePassword = () => {
        if (passwordInput.current.value === confirmPasswordInput.current.value) {
            confirmPasswordInput.current.setCustomValidity('');
        } else {
            confirmPasswordInput.current.setCustomValidity("Passwords do not match");
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        value.actions.asyncHandler(createUser);
    }

    return (
        <>
           <animated.div className="container" style={fade} >
                <div className="col-md-4 col-md-offset-4">
                    <div className="form--centered">
                        <h2 id="uc-heading">Sign Up</h2>
                        {value.validationError ? <ValidationError /> : null}
                        <form className="signinform" onSubmit={onSubmit}>
                            <label htmlFor="firstName">First Name</label>
                            <input className="signinform" id="firstName" name="firstName" type="text" ref={firstNameInput} />
                            <label htmlFor="lastName">Last Name</label>
                            <input className="signinform" id="lastName" name="lastName" type="text" ref={lastNameInput} />
                            <label htmlFor="emailAddress">Email Address</label>
                            <input className="signinform" id="emailAddress" name="emailAddress" type="email" ref={emailInput} />
                            <label htmlFor="password">Password</label>
                            <input className="signinform" id="password" name="password" type="password" onChange={validatePassword} ref={passwordInput} />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input className="signinform" id="confirmPassword" name="confirmPassword" type="password" onKeyUp={validatePassword} ref={confirmPasswordInput} />
                            <div className="buttonsDiv">
                                <button className="buttons" type="submit">Sign Up</button>
                                 <NavLink to="/"><button className="buttons">Cancel</button></NavLink>
                            </div>
                        </form>
                            <p className="txt-footer">Already have a user account? <br/>Click here to <NavLink className="signup-link" to='/signin'>sign in!</NavLink></p>
                    </div>
                </div>
            </animated.div>
                
        </> 
    );
}


export default UserSignUp;