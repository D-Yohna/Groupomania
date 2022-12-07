import React, { useEffect, useState } from 'react';
import Posts from './Post/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import { isEmpty } from '../Utils/utils';


const Actu = () => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(5);
    const [loadPosts, setLoadPosts] = useState(true);
    const posts = useSelector((state) => state.postReducer)

    const loadMore = () => {
        if(window.innerHeight + document.documentElement.scrollTop +1 > document.scrollingElement.scrollHeight) {
            setLoadPosts(true);
        }
    }

    useEffect(() => {
        if (loadPosts) {
            setLoadPosts(false);
            dispatch(getPosts(count));
            setCount(count+5)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPosts]) 

    return (
        <>
            <div className="container">
                <div className="row">
                    <ul>
                        {!isEmpty(posts) &&
                            posts.map((post) => {
                                return <Posts post={post} key={post._id}/>
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Actu;