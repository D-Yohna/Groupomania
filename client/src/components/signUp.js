import axios from 'axios';
import React, { useState } from 'react';
import SignInForm from './signIn.js';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formSubmit, setFormSubmit] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        const emailError = document.getElementById('emailError')
        const passwordError = document.getElementById('passwordError')
        const pseudoError = document.getElementById('pseudoError')
        const confirmPasswordError = document.getElementById('confirmPasswordError')
        
        if(password === confirmPassword){
            axios({
                method:'post',
                url:`${process.env.REACT_APP_API_URL}api/user/register`,
                withCredentials:true,
                data: {
                    email,
                    pseudo,
                    password
                }
            })
            .then((res) => {
                if(res.data.errors) {
                    emailError.innerHTML = res.data.errors.email
                    passwordError.innerHTML = res.data.errors.password
                    pseudoError.innerHTML = res.data.errors.pseudo
                } else {
                    setFormSubmit(true);
                }
            })
            .catch((err) => console.log(err))
        } else {
            confirmPasswordError.innerHTML = "Les mots de passe ne correspondent pas"
        }
    }

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <p className="text-success text-center">Enregistrement réussi, veuillez vous connecter</p>
                </>
            ) : (
                <form className="text-center" onSubmit={handleRegister}>
                    <label htmlFor='email'>Email</label>
                    <br />
                    <input className="Input" type='text' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <div id="emailError" className="text-danger fw-bold"></div>
                    <label htmlFor='pseudo'>Pseudo</label>
                    <br />
                    <input className="Input" type="text" id='pseudo' name='pseudo' value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                    <br />
                    <div id="pseudoError" className="text-danger fw-bold"></div>
                    <label htmlFor='password'>Mot de passe</label>
                    <br />
                    <input className="Input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <div id="passwordError" className="text-danger fw-bold"></div>
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <br />
                    <input className="Input" type="password" id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <br />
                    <div id="confirmPasswordError" className="text-danger fw-bold"></div>
                    <input type="submit" value="S'inscrire" className="btn btn-outline-light Button"/>
                </form>
            )}
        </>
    );
};

export default SignUp;