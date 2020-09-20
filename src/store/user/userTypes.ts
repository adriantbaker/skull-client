export interface User {
    username: string
}

export interface UserState {
    user: User
}

export const SET_USER = 'SET_USER';

interface SetUserAction {
    type: typeof SET_USER
    payload: User
}

export type UserActionTypes = SetUserAction
