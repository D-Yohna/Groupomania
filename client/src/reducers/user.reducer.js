import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO, FOLLOW, UNFOLLOW } from '../actions/user.actions'

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER: return action.payload;
        case UPLOAD_PICTURE: 
            return {
                ...state,
                picture: action.payload
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case FOLLOW:
            return {
                ...state,
                following: [action.payload, ...state.following]
            }
        case UNFOLLOW:
            return {
                ...state,
                following: state.following.filter((_id) => _id !== action.payload) //Remove user by putting all the others
            }
        default: return state;
    }
}