import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchSchedule} from "./sceduleAPI";
import {RootState} from "../../app/store";

export const getSchedule = createAsyncThunk(
    'schedule/getSchedule',
    async () => {
        return await fetchSchedule();
    }
)

export enum weekOrder {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export type objectT = {
    "building ": string,
    classroom: string,
    classroomLink: string,
    format: string,
    subject: string,
    teacher: string,
    teacherLink: string,
    time: string
}

export interface valueI {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
    object: objectT[]
}

interface stateInterface {
    value: valueI[],
    currentDay: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
    status: 'loading' | 'success' | 'failed'
}

const initialState: stateInterface = {
    value: [],
    currentDay: 'Sunday',
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
            .addCase(getSchedule.fulfilled, (state, action) => {
                state.status = 'success';
                state.value = action.payload.sort((a: valueI, b: valueI) => {
                    let day1 = a.day
                    let day2 = b.day
                    return weekOrder[day1] - weekOrder[day2]
                })
                state.currentDay = weekOrder[new Date().getDay()] as stateInterface['currentDay']
            })
            .addCase(getSchedule.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const scheduleSelector = (state: RootState) => state.schedule;

export default scheduleSlice.reducer