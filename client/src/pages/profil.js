import React, { useContext, useState } from 'react';
import Log from '../components/log';
import UpdateProfil from '../components/UpdateProfil'
import { UidContext } from "../components/AppContext"


const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div className  ="container">
            {uid ? (
                 <UpdateProfil />
            ) : (
                <div className ="row">
                    <div className="col-8">
                        <Log signin={false} signup={true} />
                    </div>
                    <div className="col-4 position-relative">
                        <img className = "img-fluid position-absolute top-50" src="../../img/log.svg" alt="log.svg"/>
                    </div>
                </div>
            )}  
        </div>
    );
};

export default Profil;