import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment, deletePost, updatePost } from '../../actions/post.actions';
import { isEmpty, hasPicture } from '../../Utils/utils';
import LikeButton from './LikeButton';
import Swal from 'sweetalert2';
import { follow, unfollow } from '../../actions/user.actions';
import Comments from './Comments';

const Posts = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [timestamp, setTimestamp] = useState(post.createdAt)
    const [postDate, setPostDate] = useState(post.createdAt)
    const [updateButton, setUpdateButton] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false);
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();
    const UpdateButton = document.getElementById('UpdateButton');
    const [updatedMessage, setUpdatedMessage] = useState(post.message)
    const [comments, setComments] = useState(false)
    const [text, setText] = useState('');

    const Update = () => {
        setIsUpdated(true);
        UpdateButton.setAttribute('disabled', 'disabled')
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updatePost(post._id, updatedMessage))
        setIsUpdated(false);
    }

    const handleDelete = () => {
        Swal.fire({
            title: "Suppression de post",
            text: "Une fois supprimé, vous ne pourrez plus récupérer votre post!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Supprimer'
          })
            .then((value) => {
                if(value.isConfirmed) {
                    dispatch(deletePost(post._id))
                    Swal.fire("Supprimé", "Votre poste a été supprimé avec succès.", "success")
                }
            })
    }

    const handleFollow = () => {
        dispatch(follow(userData._id, post.posterId))
        setIsFollowed(true);
    }

    const handleUnfollow = () => {
        dispatch(unfollow(userData._id, post.posterId))
        setIsFollowed(false);
    }

    const handleComments = () => {
        setComments(!comments);
    }

    const handleComment = () => {
        if(text !== '') {
            dispatch(Comment(post._id, userData._id, text));
            setText('');
            setComments(true);
        }
    }

    useEffect(() => {
        setTimestamp(post.createdAt)
        setUpdateButton(false);
        setComments(false);
        if(!isEmpty(usersData)){
            setIsLoading(false);
            setPostDate(new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(new Date(timestamp)));

            if(post.posterId === userData._id ) {
                setUpdateButton(true)
            }
            
            if(userData.following) {
                setIsFollowed(false);
                for (let i = 0; i < userData.following.length; i++) {
                    if(userData.following[i] === post.posterId) {
                        return setIsFollowed(true);
                    }  
                }
            }
        }
        
    }, [usersData, userData, post])

    return (
        <>
            <div className="container my-2 Post-container bg-dark" key={post._id}>
                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="row mt-1">
                            <div className="col-2 col-lg-1 my-auto">
                                <div className="PostPic"> 
                                    <img src={
                                        !isEmpty(usersData) &&
                                        usersData.map((user) => {
                                            if(user._id === post.posterId) return user.picture;
                                        }).join('')
                                    } alt="pic" className="profilePicture mx-auto d-block"/>
                                </div>
                            </div>
                            <div className="col-5 my-auto">
                                <b className="text-start d-block m-auto">
                                    {!isEmpty(usersData) &&
                                        usersData.map((user) => {
                                            if(user._id === post.posterId) return user.pseudo
                                        })

                                    }
                                    {isFollowed ? (
                                        <img className="followButton" src="./img/icons/checked.svg" alt="Followed" onClick={handleUnfollow}/>
                                    ) : (
                                        <img className="followButton" src="./img/icons/check.svg" alt="Follow" onClick={handleFollow}/>
                                    )}
                                </b>
                            </div>
                            <div className="col-5">
                                    <p className="text-end my-auto">{postDate}</p>
                                    {updateButton &&
                                    <div className="postOption-container mt-1">
                                        <button className="btn btn-sm btn-primary ms-2 me-1 postOption" onClick={handleDelete}>Supprimer</button>
                                        <button id="UpdateButton" className="btn btn-sm btn-primary postOption" onClick={Update}>Modifier</button>
                                    </div>
                                    }
                            </div>
                        </div>
                        {isUpdated === false &&
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col">
                                <p>{post.message}</p>
                                {hasPicture(post.picture) &&
                                    <img src={post.picture} alt="" className="w-100"></img>
                                }
                            </div>
                        </div>
                        }
                        {isUpdated &&
                            <div className="row">
                            <div className="col-1"></div>
                            <div className="col">
                                <form onSubmit={handleUpdate}>
                                    <textarea className="float-start form-control" onChange={(e) => setUpdatedMessage(e.target.value)} defaultValue={post.message}/>
                                    {hasPicture(post.picture) &&
                                        <img src={post.picture} alt="" className="w-100"></img>
                                    }
                                    <div className="row">
                                        <div className="col-8">
                                        </div>
                                        <div className="col-4">
                                        <input type="submit" name="submit" id="submit" className="btn btn-sm btn-primary ms-4" value="Valider les modifications"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        }
                        <div className="row mb-3 mt-2 ">
                            <div className="col-1"></div>
                            <div className="col my-auto">
                                <LikeButton post={post}/>
                            </div>
                            <div className="col my-auto">
                                {comments === false &&
                                    <img src="../img/icons/message1.svg" alt="comment" className="mx-auto d-block icon" onClick={handleComments}/>
                                }
                                {comments &&
                                    <img src="../img/icons/message2.svg" alt="comment" className="mx-auto d-block icon" onClick={handleComments}/>
                                }
                            </div>
                        </div>
                        {!isEmpty(post.comments) && comments === false &&
                            <>
                                <div className="row">
                                    <div className="col-10">
                                        <input placeholder="Ajouter un commentaire"type="text" className="w-100 commInput" onChange={(e) => {setText(e.target.value)}} />
                                    </div>
                                    <div className="col-2">
                                        <button className="btn btn-sm btn-primary CommPublish" onClick={handleComment}>Publier</button>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="container">
                                        <div className="row">
                                            {post.comments[0].commenterPic &&
                                                <div className="col-1 PostPic">
                                                    <img className="profilePicture mx-auto d-block" src={post.comments[0].commenterPic} alt="pic"/>
                                                </div>
                                            }
                                            <div className="col my-auto">
                                                <p className="fw-bold">{post.comments[0].commenterPseudo}</p>
                                            </div>
                                        </div>
                                        <div className="row m-3">
                                            <div className="container">
                                                <p>{post.comments[0].text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {!isEmpty(post.comments) && comments &&
                        <>
                            <div className="row">
                                <div className="col-10">
                                    <input placeholder="Ajouter un commentaire"type="text" className="w-100 commInput" onChange={(e) => {setText(e.target.value)}} />
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-sm btn-primary CommPublish" onClick={handleComment}>Publier</button>
                                </div>
                            </div>
                            <div className="row mt-1">
                                {!isEmpty(post.comments) &&
                                    post.comments.map((comment) => {
                                        return <Comments postId={post._id} comment={comment} key={comment._id}/>
                                    })
                                }
                            </div>
                        </>
                        }
                        {isEmpty(post.comments) &&
                            <div className="row mb-2">
                                <div className="col-10">
                                    <input placeholder="Soyez le premier à commenter"type="text" className="w-100 commInput" onChange={(e) => {setText(e.target.value)}} />
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-sm btn-primary CommPublish" onClick={handleComment}>Publier</button>
                                </div>
                            </div>
                        }
                    </>
                )}
            </div>
        </>
    );
};

export default Posts;