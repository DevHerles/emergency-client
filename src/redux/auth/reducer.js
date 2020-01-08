import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER
} from '../actions';

const INIT_STATE = {
    user: localStorage.getItem('token'),
    loading: false,
    error: ""
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true, error: "" };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case LOGIN_USER_ERROR:
            return { ...state, loading: false, user: null, error: action.payload };
        case REGISTER_USER:
            return { ...state, loading: true };
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload.uid };
        case LOGOUT_USER:
            return { ...state ,user:null};
        default: return { ...state };
    }
}
