import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_BIO = 'UPDATE_BIO';
export const FOLLOW = "FOLLOW";
export const UNFOLLOW = "UNFOLLOW";

export const getUser = (uid) => {
    return(dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => dispatch({type: GET_USER, payload: res.data})) 
            .catch((err) => console.log(err))
    }
};

export const uploadPicture = (data, id) => {
    return(dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    .then((res) => dispatch({type: UPLOAD_PICTURE, payload: res.data.picture}))
            })
            .catch((err) => console.log(err))
    }
}

export const updateBio = (bio, uid) => {
    return(dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
            data: { bio },
            withCredentials:true
        }) 
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: res.data.bio})
            })
            .catch((err) => console.log(err))
    }
}

export const follow = ( uid, idToFollow ) => {
    return(dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/follow/${uid}`,
            data: { idToFollow },
            withCredentials:true
        }) 
            .then((res) => {
                dispatch({ type: FOLLOW, payload: idToFollow})
            })
            .catch((err) => console.log(err))
    }

}

export const unfollow = ( uid, idToUnfollow ) => {
    return(dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/unfollow/${uid}`,
            data: { idToUnfollow },
            withCredentials:true
        }) 
            .then((res) => {
                dispatch({ type: UNFOLLOW, payload: idToUnfollow})
            })
            .catch((err) => console.log(err))
    }
}


