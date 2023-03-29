import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchSchedule} from "./sceduleAPI";
import {RootState} from "../../app/store";

export const getSchedule = createAsyncThunk(
    'schedule/getSchedule',
    async () => {
        return await fetchSchedule();
    }
)


interface stateInterface {
    value: any,
    status: 'loading' | 'success' | 'failed'
}

const initialState: stateInterface = {
    value: {},
    status: 'loading'
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSchedule.pending, (state) => {
                state.status = 'loading';

            })
        builder.addCase(getSchedule.fulfilled, (state, action) => {
                state.status = 'success';
                state.value = action.payload

            })
        builder.addCase(getSchedule.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const scheduleSelector = (state: RootState) => state.schedule;

export default scheduleSlice.reducer