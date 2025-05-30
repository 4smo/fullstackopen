import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        set(state, action) {
            return action.payload
        },
        clear(state, action) {
            return null
        }
    },
})

export const setNotification = (content) => {
    return async dispatch => {
        dispatch(set(content))
        setTimeout(()=> {
            dispatch(clear())
        }, 5 * 1000)
    }
}

export const { set, clear } = notificationSlice.actions
export default notificationSlice.reducer