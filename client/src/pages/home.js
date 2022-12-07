import React, { useContext, useEffect } from 'react';
import Log from '../components/log';
import Actu from '../components/Actu';
import { UidContext } from "../components/AppContext"
import Publish from '../components/Publish';
import { getUser } from '../actions/user.actions';
import { useDispatch } from 'react-redux';

const Home = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser)
    })

    return (
        <>
        {uid ? (
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <Publish />
                        <Actu />
                    </div>
                    <div className="col-3">

                    </div>
                </div>
            </div>
        ) : (
            <>
                <Log signin={true} signup={false} />
                <Actu />
            </>
        )}
        </>
    );
};

export default Home;