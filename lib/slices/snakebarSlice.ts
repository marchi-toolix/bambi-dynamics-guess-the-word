import { createSlice } from '@reduxjs/toolkit'
import { CoreState } from '../store'


type SnakeBarState = {
    open: boolean
    message: string
    severity: 'error' | 'warning' | 'info' | 'success'
    autoHideDuration: number
}


const initialState: SnakeBarState = {
    open: false,
    message: '',
    severity: 'success',
    autoHideDuration: 6000
}

const SnakebarSlice = createSlice({
    name: 'snakebar',
    initialState,
    reducers: {
       setOpen: (state) => {
           state.open = true;
       },
       setClose: (state) => {
           state.open = false
       },
       setMessage: (state,action) => {
           state.message = action.payload
       },
       resetMessage: (state) => {
           state.message = ""
       },
       setSeverity: (state, action) => {
        state.severity = action.payload
       },
       setAutoHideDuration: (state, action) => {
           state.autoHideDuration = action.payload
       }
    },

})

export const SnakebarState = (state: CoreState) => state.snakebar

export const { setOpen, setClose, setMessage, resetMessage, setAutoHideDuration, setSeverity} = SnakebarSlice.actions

export default SnakebarSlice.reducer
