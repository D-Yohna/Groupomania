import React, { useState, useEffect } from 'react';
import Routes from "./components/routes";
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { getUser } from './actions/user.actions';
import { getUsers } from './actions/users.actions';

const App = () => {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {

        const CheckToken = async () => {

            await axios({
                method:'get',
                url:`${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials:true,
            })
            .then((res) => setUid(res.data))
            .catch((err) => console.log('No Token'))
        }
        CheckToken();

        if(uid) {
            dispatch(getUser(uid));
        }
        dispatch(getUsers());
    }, [uid, dispatch])

    return (
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
};

export default App;