import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { like, unlike } from '../../actions/post.actions';

const LikeButton = ({ post }) => {
    const [Liked, setLiked] = useState(false);
    const uid = useContext(UidContext)
    const dispatch = useDispatch();

    useEffect(() => {
        if(post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers])

    const handleLike = () => {
        dispatch(like(post._id, uid));
        setLiked(true);
    }

    const handleUnlike = () => {
        dispatch(unlike(post._id, uid));
        setLiked(false);
    }

    return (
        <>
            {uid === null &&
                <Popup trigger={<img src ="./img/icons/heart.svg" className="mx-auto d-block icon" alt ="like"/>} position={['bottom center', 'bottom left', 'bottom right']} closeOnDocumentClick>
                    <div>Connectez-vous pour aimer !</div>
                </Popup>
            }
            {uid && Liked === false &&
                <img src ="./img/icons/heart.svg" onClick={handleLike}className="mx-auto d-block icon" alt ="like"/>
            }
            {uid && Liked &&
                <img src ="./img/icons/heart-filled.svg" onClick={handleUnlike}className="mx-auto d-block icon" alt ="unlike"/>
            }
        </>
    );
};

export default LikeButton;