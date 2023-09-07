import { configureStore } from '@reduxjs/toolkit';

function profileReducer(state = { 
    displayName: 'John Doe',
    username: 'johndoe',
    id: '1234567890',
 }, action) { 
    switch (action.type) {
        case 'profile/login':
            return { ...state, displayName: action.payload.displayName, username: action.payload.username, id: action.payload.id }
        case 'profile/logout':
            return { ...state, 
                displayName: 'John Doe',
                username: 'johndoe',
                id: '1234567890' }
        default:
            return state
    }
}

function tokenReducer(state = { token: null }, action) {
    switch (action.type) {
        case 'token/login':
            return { ...state, token: action.payload.token }
        case 'token/logout':
            return { ...state, token: null }
        default:
            return state
    }
}

export default configureStore({
    reducer: {
        profile: profileReducer,
        token: tokenReducer
    }
})

export const store = configureStore({
    reducer: {
        profile: profileReducer,
    }
})

