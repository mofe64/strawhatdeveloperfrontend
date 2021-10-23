import { GET_A_POST, GET_POSTS, GET_POSTS_FOR_A_TAG, ADD_POST, SEARCH_POSTS} from '../actions/postActions';

const initialState = {
    posts: [],
    searchResults: [],
    tagSearchResults: [],
    currentPost: {},
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.posts,
            }
        case GET_A_POST:
            return {
                ...state,
                currentPost: action.post
            }
        case GET_POSTS_FOR_A_TAG:
            return {
                ...state,
                tagSearchResults: action.posts,
            }
        case SEARCH_POSTS:
            return {
                ...state,
                searchResults: action.posts
            }
        case ADD_POST:
            const updatedPosts = state['posts'].push(action.post);
            return {
                ...state,
                posts: updatedPosts
            }
        default:
            return state
    }  
};

export default postReducer;