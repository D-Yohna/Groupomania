import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import Swal from 'sweetalert2';
import { DeleteComment, LikeComment, UnlikeComment, UpdateComment } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const Comments = ({ postId, comment }) => {
    const uid = useContext(UidContext);
    const [isUpdated, setIsUpdated] = useState(false);
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [liked, setLiked] = useState(false);

    const showUpdate = () => {
        setIsUpdated(!isUpdated);
    }

    const handleUpdateComment = () => {
        dispatch(UpdateComment(postId, comment._id, text));
        setIsUpdated(false);
    }

    const handleDeleteComment = () => {
            Swal.fire({
                title: "Suppression de commentaire",
                text: "Votre commentaire sera définitivement supprimé",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'Supprimer'
              })
                .then((value) => {
                    if(value.isConfirmed) {
                        dispatch(DeleteComment(postId, comment._id))
                        Swal.fire("Supprimé", "Votre commentaire a été supprimé avec succès.", "success")
                    }
                })
    }

    const handleLikeComment = () => {
        dispatch(LikeComment(postId, comment._id, uid))
        setLiked(true);
    }

    const handleUnlikeComment = () => {
        dispatch(UnlikeComment(postId, comment._id, uid))
        setLiked(false);
    }

    useEffect(() => {
        setLiked(false);
        comment.likers.map((liker) => {
            if(liker === uid) return setLiked(true)
        })
    }, [comment.likers])

    return (           
            <div className="container">
                <div className="row">
                    <div col className="col-1 PostPic">
                        {comment.commenterPic &&
                            <img className="profilePicture" src={comment.commenterPic} alt="pic"/>
                        }
                    </div>
                    <div className="col my-auto">
                        <p className="fw-bold">{comment.commenterPseudo}</p>
                    </div>
                    {uid === comment.commenterId &&
                        <>
                            <div className="col-1 my-auto">
                                <p className="pLink text-little" onClick={showUpdate}>Modifier</p>
                            </div>
                            <div className="col-1 my-auto">
                                <p className="pLink text-little" onClick={handleDeleteComment}>Supprimer</p>
                            </div>
                        </>
                    }
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    {isUpdated === false &&
                        <div className="col">
                            <p>{comment.text}</p>
                        </div>
                    }
                    {isUpdated &&
                        <div className="col">
                            <form className="UpdComm-container" onSubmit={handleUpdateComment}>
                                <textarea className="form-control" defaultValue={comment.text} onChange={(e) => {setText(e.target.value)}}></textarea>
                                <div className="ValidateButton">
                                    <input type="submit" name="submit" id="UpdComm" className="btn btn-sm btn-primary" value="Valider"/>
                                </div>
                            </form>
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="col ValidateButton">

                        {uid === null ? (

                            <Popup trigger={<button className="btn btn-secondary btn-sm likeButton LikeComm">J'aime {comment.likers.length}</button>} position={['bottom center', 'bottom left', 'bottom right']} closeOnDocumentClick>
                                <div>Connectez-vous pour aimer !</div>
                            </Popup>
                        ) : (
                            <>
                                {liked === false &&
                                    <button className="btn btn-secondary btn-sm likeButton LikeComm" onClick={handleLikeComment}>
                                        J'aime {comment.likers.length}
                                    </button>
                                }
                                {liked  &&
                                    <button className="btn btn-primary btn-sm likeButton LikeComm" onClick={handleUnlikeComment}>
                                        J'aime {comment.likers.length}
                                    </button>
                                }
                            </>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default Comments;