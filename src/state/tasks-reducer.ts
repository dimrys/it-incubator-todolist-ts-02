import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAC, RemoveTodoListAC, TypeActionType} from "./todolists-reducer";

export enum TasksActionType {
    REMOVE_TASK = 'REMOVE-TASK',
    ADD_TASK = 'ADD-TASK',
    CHANGE_STATUS_TASK = 'CHANGE-STATUS-TASK',
    CHANGE_TITLE_TASK = 'CHANGE-TITLE-TASK',
}

export type ActionTaskType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTitleStatusAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof RemoveTodoListAC>
const initState: TaskStateType = {}


export const tasksReducer = (state: TaskStateType = initState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case TasksActionType.REMOVE_TASK: {
            return {
                ...state,
                [action.tlId]: state[action.tlId].filter(t => t.id !== action.taskId)
            }
        }
        case TasksActionType.ADD_TASK: {
            const newTask = {id: v1(), title: action.titleTask, isDone: false}
            return {
                ...state,
                [action.tlId]: [newTask, ...state[action.tlId]]
            }
        }
        case TasksActionType.CHANGE_STATUS_TASK: {
            return {
                ...state,
                [action.tlId]: state[action.tlId].map(t => {
                    if (t.id === action.taskId) {
                        return {...t, isDone: action.isDone}
                    }
                    return t
                })
            }
        }
        case TasksActionType.CHANGE_TITLE_TASK: {
            return {
                ...state,
                [action.tlId]: state[action.tlId].map(t => {
                    if (t.id === action.taskId) {
                        return {...t, title: action.titleTask}
                    }
                    return t
                })
            }
        }
        case TypeActionType.ADD_TODOLIST: {
            return {
                ...state,
                [action.idTd]: []
            }
        }
        case TypeActionType.REMOVE_TODOLIST: {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, tlId: string) => {
    return {type: TasksActionType.REMOVE_TASK, taskId, tlId} as const
}
export const addTaskAC = (titleTask: string, tlId: string) => {
    return {type: TasksActionType.ADD_TASK, titleTask, tlId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, tlId: string) => {
    return {type: TasksActionType.CHANGE_STATUS_TASK, taskId, isDone, tlId} as const
}
export const changeTitleStatusAC = (taskId: string, titleTask: string, tlId: string) => {
    return {type: TasksActionType.CHANGE_TITLE_TASK, taskId, titleTask, tlId} as const
}
