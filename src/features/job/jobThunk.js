import authHeader from '../../utils/authHeader';
import customFetch from '../../utils/axios';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { logoutUser } from '../user/userSlice';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
    try {
        const response = await customFetch.post(
            '/jobs',
            job,
            authHeader(thunkAPI)
        );
        thunkAPI.dispatch(clearValues());
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue(
                'Unauthorized attempt... logging out...'
            );
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await customFetch.delete(
            `/jobs/${jobId}`,
            authHeader(thunkAPI)
        );
        thunkAPI.dispatch(getAllJobs());
        return response.data.msg;
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
    try {
        const response = await customFetch.patch(
            `/jobs/${jobId}`,
            job,
            authHeader(thunkAPI)
        );
        thunkAPI.dispatch(clearValues());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};
