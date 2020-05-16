import { userAPI } from "../api/api";

const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
const SET_IS_FIND = 'SET_IS_FIND';
const SET_FRIEND_STATUS = 'SET_FRIEND_STATUS';
const CLEAN = 'CLEAN';

const initialState = {
    isFind: null,
    userId: null,
    friendStatus: null,
    nick: null,
    mail: null,
    city: null,
    urlPicture: null
}

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {
                isFind: true,
                userId: action.userId,
                friendStatus: action.friendStatus,
                nick: action.nick,
                mail: action.mail,
                city: action.city,
                urlPicture: action.urlPicture
             };
        case CLEAN:
            return { ...initialState };
        case SET_IS_FIND:
            return { ...state, isFind: action.isFind};
        case SET_FRIEND_STATUS:
            return { ...state, friendStatus: action.friendStatus};
        default:
            return state;
    }
}

export const setUserByIdThunk = (id) => async (dispatch, getState) => {
    try {
        if(id === getState().userProfilePage.id) return;

        let user;

        if (id === 'me') {
            const data = getState().auth.user;
            user = [
                id,
                -1,
                data.nick,
                data.mail,
                data.city,
                data.urlPicture
            ];
        }
        else {
            const data = await userAPI.getUser(id);
            
            if (data.err) throw new Error(data.err);
            if (data.User.Nick === '') {
                dispatch( setIsFind(false) );
                return;
            }

            user = [
                id,
                data.Status,
                data.User.Nick,
                data.User.Mail,
                data.User.City,
                data.User.UrlPicture
            ];
        }

        dispatch(setUser(...user));
    }
    catch(err) {
        throw err;
    }
}

export const setUser = (userId, friendStatus, nick, mail, city, urlPicture) => ({
    type: SET_PROFILE_DATA, 
    userId: userId,
    friendStatus: friendStatus,
    nick: nick, 
    mail: mail, 
    city: city, 
    urlPicture: urlPicture 
});

export const clean = () => ({ type: CLEAN });
export const setIsFind = (isFind) => ({ type: SET_IS_FIND, isFind: isFind });
export const setFriendStatus = (friendStatus) => ({ type: SET_FRIEND_STATUS, friendStatus: friendStatus });

export default userProfileReducer;