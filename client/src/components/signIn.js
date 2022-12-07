import React, { useState } from 'react';
import axios from 'axios';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleLogin = (e) => {
        e.preventDefault()

        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        axios({
            method:'post',
            url:`${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials:true,
            data: {
                email,
                password
            }
        })
            .then((res) => {
                if(res.data.errors) {
                    emailError.innerHTML = res.data.errors.email
                    passwordError.innerHTML = res.data.errors.password
                } else {
                    window.location="/";
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <form onSubmit={handleLogin} className="text-center">
            <label htmlFor="email">Email</label>
            <br />
            <input className="Input" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <div id="emailError" className="text-danger fw-bold"></div>
            <label htmlFor="password">Password</label>
            <br />
            <input className="Input" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <br />
            <div id="passwordError" className="text-danger fw-bold"></div>
            <input type="submit" value="Se connecter" className="btn btn-outline-light Button" />
        </form>
    );
};

export default SignIn;