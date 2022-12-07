import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const LIKE = 'LIKE';
export const UNLIKE = 'UNLIKE';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const COMMENT = 'COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const UNLIKE_COMMENT = 'UNLIKE_COMMENT';
export const CREATE_POST = 'CREATE_POST';

export const getPosts = (num) => {
    return(dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
                const array = res.data.slice(0, num)
                dispatch({type: GET_POSTS, payload: array})
            })
            .catch((err) => console.log(err))
    }
}
export const like = (id, uid) => {
    return(dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/like-post/${id}`,
            data: { liker: uid },
            withCredentials:true
        }) 
            .then((res) => {
                dispatch({ type: LIKE, payload: {id, uid}})
            })
            .catch((err) => console.log(err))
    }
}

export const unlike = (id, uid) => {
    return(dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/${id}`,
            data: { unliker: uid },
            withCredentials:true
        }) 
            .then((res) => {
                dispatch({ type: UNLIKE, payload: {id, uid}})
            })
            .catch((err) => console.log(err))
    }
}

export const createPost = (data) => {
    return(dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/post`, data)
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/post`)
                    .then((res) => dispatch({type:CREATE_POST, payload: res.data}))
            })
            .catch((err) => console.log(err))
    }
}

export const updatePost = (id, updatedMessage) => {
    return(dispatch) => {
        return axios({
            method:'put',
            url:`${process.env.REACT_APP_API_URL}api/post/${id}`,
            data: { message: updatedMessage },
            withCredentials: true
        })
            .then((res) => {
                dispatch({ type: UPDATE_POST, payload: updatedMessage })
            })
            .catch((err) => {console.log(err)})
    }
}

export const deletePost = (id) => {
    return(dispatch) => {
        return axios
            .delete(`${process.env.REACT_APP_API_URL}api/post/${id}`)
            .then((res) => dispatch({type: DELETE_POST, payload: id})) 
            .catch((err) => console.log(err))
    }
}

export const Comment = ( pid, uid, text ) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url:`${process.env.REACT_APP_API_URL}api/post/comment/${pid}`,
            data: {
                commenterId: uid,
                text: text
            },
            withCredentals:true
        })
            .then((res) => {
                dispatch({type : COMMENT, payload: res.data.comments})
            })
            .catch((err) => console.log(err))
    }
}

export const UpdateComment = ( pid, commentId, text ) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url:`${process.env.REACT_APP_API_URL}api/post/editcomment/${pid}`,
            data: {
                commentId,
                text
            },
            withCredentials:true,
        })
            .then((res) => dispatch({ type: UPDATE_COMMENT, payload: res.data.comments}))
            .catch((err) => console.log(err))
    }
}

export const DeleteComment = ( pid, commentId ) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url:`${process.env.REACT_APP_API_URL}api/post/deletecomment/${pid}`,
            data: {
                commentId
            },
            withCredentials:true,
        })
            .then((res) => dispatch({ type: DELETE_COMMENT, payload: res.data.comments}))
            .catch((err) => console.log(err))
    }
}

export const LikeComment = ( pid, commentId, uid ) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url:`${process.env.REACT_APP_API_URL}api/post/likecomment/${pid}`,
            data: {
                commentId,
                likerId: uid
            },
            withCredentials:true
        })
            .then((res) => dispatch({ type: LIKE_COMMENT, payload: res.data.comments}))
            .catch((err) => console.log(err))
    }
}

export const UnlikeComment = ( pid, commentId, uid ) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url:`${process.env.REACT_APP_API_URL}api/post/unlikecomment/${pid}`,
            data: {
                commentId,
                likerId: uid
            },
            withCredentials:true
        })
            .then((res) => dispatch({ type: LIKE_COMMENT, payload: res.data.comments}))
            .catch((err) => console.log(err))
    }
}