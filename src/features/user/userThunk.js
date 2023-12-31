import authHeader from '../../utils/authHeader';
import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
    try {
        const response = await customFetch.post(url, user);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
    try {
        const response = await customFetch.post(url, user);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user, authHeader(thunkAPI));
        return resp.data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue(
                'Unauthorized attempt... logging out...'
            );
        }

        console.log(error.response);
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};
