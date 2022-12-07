import React, { useState } from 'react';
import SignInForm from './signIn.js';
import SignUpForm from './signUp.js'

const Log = ( props ) => {
    const [signInModal, setSignInModal] = useState(props.signin);
    const [signUpModal, setSignUpModal] = useState(props.signup);

    const handleModals = (e) => {
        if(e.target.id === "register"){
            setSignInModal(false);
            setSignUpModal(true);
        } else if(e.target.id === "login") {
            setSignInModal(true);
            setSignUpModal(false);
        }
    }

    return (
        <div className  ="log container border maincolor">
            <div className ="row">
                <div className="col-3 my-auto">
                    <ul className="logList">
                        <li onClick ={handleModals} id="register" className={signUpModal ? "btn btn-sm btn-outline-light my-2 LogModal active" : "btn btn-sm btn-outline-light my-2 LogModal"}>S'inscrire</li>
                        <li onClick ={handleModals} id="login" className={signInModal ? "btn btn-sm btn-outline-light my-2 LogModal active" : "btn btn-sm btn-outline-light my-2 LogModal"}>Se connecter</li>
                    </ul>
                </div>
                <div className="col-9">
                    {signInModal && <SignInForm />}
                    {signUpModal && <SignUpForm />}
                </div>
            </div>
        </div>
    );
};

export default Log;