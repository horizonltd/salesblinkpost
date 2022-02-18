import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
    CREATE_POST_COMMENT_REQUEST,
    CREATE_POST_COMMENT_SUCCESS,
    CREATE_POST_COMMENT_FAIL,
    CREATE_POST_COMMENT_RESET,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL,
    UPDATE_POST_RESET,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
    CREATE_POST_RESET,
    USER_UPDATE_PROFILE_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,

} from '../constants/constants'


// Post Reducers
export const postListReducer = (state = {posts: []}, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            return {loading: true, posts: []}

        case POST_LIST_SUCCESS:
            return {
                loading: false,
                posts: action.payload.posts,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case POST_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const postDetailsReducer = (state = {post: {comments: []}}, action) => {
    switch (action.type) {
        case POST_DETAILS_REQUEST:
            return {loading: true, ...state}

        case POST_DETAILS_SUCCESS:
            return {loading: false, post: action.payload}

        case POST_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const createPostReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return {loading: true}

        case CREATE_POST_SUCCESS:
            return {loading: false, post: action.payload, success: true}

        case CREATE_POST_FAIL:
            return {loading: false, error: action.payload}

        case CREATE_POST_RESET:
            return {}


        default:
            return state
    }
}

export const deletePostReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_POST_REQUEST:
            return {loading: true}

        case DELETE_POST_SUCCESS:
            return {loading: false, success: true}

        case DELETE_POST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const updatePostReducer = (state = {post: {} }, action) => {
    switch (action.type) {
        case UPDATE_POST_REQUEST:
            return {
                loading: true
            }

        case UPDATE_POST_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload
            }

        case UPDATE_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_POST_RESET:
            return {
                product: {}
            }

        default:
            return state
    }
}

// USER REDUCERS
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}

        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}

        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}

        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}

        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userDetailsReducer = (state = {user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {...state, loading: true}

        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload}

        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        case USER_DETAILS_RESET:
            return {user: {}}

        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}

        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload}

        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload}

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}

export const updateUserReducer = (state = {user: {} }, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {loading: true}

        case UPDATE_USER_SUCCESS:
            return {loading: false, success: true}

        case UPDATE_USER_FAIL:
            return {loading: false, error: action.payload}

        case UPDATE_USER_RESET:
            return {
                user: {}
            }

        default:
            return state
    }
}

export const createPostCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST_COMMENT_REQUEST:
            return {
                loading: true
            }

        case CREATE_POST_COMMENT_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case CREATE_POST_COMMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CREATE_POST_COMMENT_RESET:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}
