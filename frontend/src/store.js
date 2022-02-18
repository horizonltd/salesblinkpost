import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    postListReducer,
    postDetailsReducer,
    createPostCommentReducer,
    updatePostReducer,
    createPostReducer,
    deletePostReducer,
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    updateUserReducer,

} from "./reducers/reducers";

const reducer = combineReducers({
    postsListStore: postListReducer,
    postDetails: postDetailsReducer,
    createPostComment:createPostCommentReducer,
    updatePost:updatePostReducer,
    createPost:createPostReducer,
    deletePost:deletePostReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    updateUserS:updateUserReducer,
});

// Load localstorage data for userInfo
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromLocalStorage},
};
const middleware = [thunk];

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;