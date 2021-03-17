import {combineReducers, createStore} from "redux";
import {todoListReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    task:tasksReducer,
    todolists: todoListReducer
})
export const store = createStore(rootReducer)
export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store