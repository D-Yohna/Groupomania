import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow } from '../actions/user.actions';
import { isEmpty } from '../Utils/utils';

const FollowHandler = ({ idToFollow }) => {
    const userData = useSelector((state) => state.userReducer)
    const [isFollowing, setIsFollowing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isEmpty(userData.following)){
            if(userData.following.includes(idToFollow)){
                setIsFollowing(true);
            } else setIsFollowing(false);
        }
    }, [userData, idToFollow])

    const handleFollow = () => {
        dispatch(follow(userData._id, idToFollow))
        setIsFollowing(true);
    }

    const handleUnfollow = () => {
        dispatch(unfollow(userData._id, idToFollow))
        setIsFollowing(false);
    }

    return (
        <>
            {isFollowing && (
                <span>
                    <button className="btn btn-sm btn-dark" onClick={handleUnfollow}>Suivi</button>
                </span>
                )}
            {isFollowing === false && (
                <span>
                    <button className="btn btn-sm btn-primary" onClick={handleFollow}>Suivre</button>
                </span>
            )}
        </>
    );
};

export default FollowHandler;