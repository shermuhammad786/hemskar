import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    value: any
}

const initialState: CounterState = {
    value: {},
}

export const studentData = createSlice({
    name: 'data',
    initialState,
    reducers: {
        getStudentData: (state, action: PayloadAction<object>) => {
            state.value = action.payload
        },


    },
})

// Action creators are generated for each case reducer function
export const { getStudentData } = studentData.actions

export default studentData.reducer