import axios from 'axios';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from "./AppContext";

const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer)

    const Logout = () => {
        axios({
            method:'get',
            url:`${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials:true
        })
            .then((res) => window.location.reload('/'))
            .catch((err) => console.log(err))
    }
    
    const SignUp = () => {
        window.location="/profil"
    }

    const MainPage = () => {
        window.location="/";
    }

    const ProfilPage = () => {
        window.location="/profil";
    }

    return (
        <nav>
            <div className="row" id="navbar">
                    <div className="col m-auto">
                        <h4 className="fw-bold ms-4 hover" onClick={MainPage}>Groupomania</h4>
                    </div>
                {uid ? (
                    <>
                        <div className="col m-auto" onClick={ProfilPage}>
                            <p className ="pLink my-auto text-end NavUser">Bienvenue {userData.pseudo} !</p>
                        </div>
                        <div className="col-1 m-auto">
                            <img src="../../img/icons/logout.svg" alt='icon' className="hover position-absolute end-0 translate-middle icon"
                            onClick={Logout}/>
                        </div>
                    </>
                ) : (
                    <div className="col-2 m-auto">
                            <img src="../../img/icons/login.svg" alt='icon' className="hover position-absolute end-0 translate-middle icon"
                            onClick={SignUp} />   
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;