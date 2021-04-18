import { createSlice } from '@reduxjs/toolkit'
import { CoreState } from '../store'


export type HPType = {
    id: number
    status: "active" | "exploding" | "used",
}

type HPState = {
    HP: Array<HPType>
}


const initialState: HPState = {
    HP: [
        {
            id: 1,
            status: 'active'
        },
        {
            id: 2,
            status: 'active'
        },
        {
            id: 3,
            status: 'active'
        },
    ]
}

const HPSlice = createSlice({
    name: 'health-point',
    initialState,
    reducers: {
        decreaseHPStart: (state) => {
            state.HP[state.HP.length -1].status = "exploding";
        },
        decreaseHPEnd: (state) => {
            state.HP.pop();
        },
        HPReset: (state) => {
            state.HP = initialState.HP;
        },
    },

})

export const HPState = (state: CoreState) => state.HP

export const { decreaseHPStart, HPReset, decreaseHPEnd } = HPSlice.actions

export default HPSlice.reducer
