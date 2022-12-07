import { COMMENT, CREATE_POST, DELETE_COMMENT, DELETE_POST, GET_POSTS, LIKE, LIKE_COMMENT, UNLIKE, UNLIKE_COMMENT, UPDATE_COMMENT, UPDATE_POST } from '../actions/post.actions'

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POSTS: return action.payload;

        case CREATE_POST: return action.payload;

        case LIKE: 
            return state.map((post) => {
                if(post._id === action.payload.id) {
                    return {
                        ...post,
                        likers: [action.payload.uid, ...post.likers]
                    }
                }
                return post;
            })

            case UNLIKE: 
                return state.map((post) => {
                    if(post._id === action.payload.id) {
                        return {
                            ...post,
                            likers: post.likers.filter((_id) => _id !== action.payload.uid)
                        }
                    }
                    return post;
                })
                
            case UPDATE_POST:
                return {
                    ...state,
                    message: action.payload
                }

            case DELETE_POST:
                return state.filter((post) => post._id !== action.payload)

            case COMMENT:
                return {
                    ...state,
                    comments: action.payload
                }
            case UPDATE_COMMENT:
                return {
                    ...state,
                    comments: action.payload
                }
            case DELETE_COMMENT:
                return {
                    ...state,
                    comments: action.payload
                }
            case LIKE_COMMENT:
                return {
                    ...state,
                    comments: action.payload
                }
            case UNLIKE_COMMENT:
                return {
                    ...state,
                    comments: action.payload
                }

        default: return state;
    }
}