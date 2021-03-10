import {TodoListType, FilterType} from "../App";
import {v1} from "uuid";


export enum TypeActionType {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'ADD-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',

}

export type ActionType = ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoListFilterAC>

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case TypeActionType.REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.id)
        }
        case TypeActionType.ADD_TODOLIST: {
            const newTodoList: TodoListType = {id: action.idTd, title: action.title, filter: "all"}
            return [...state, newTodoList ]
        }
        case TypeActionType.CHANGE_TODOLIST_TITLE: {
            return state.map(tl => {
                if(tl.id === action.id) {
                    return {...tl, title: action.title}
                } return tl
            })
        }
        case TypeActionType.CHANGE_TODOLIST_FILTER: {
            return state.map(tl => {
                if(tl.id ===action.id){
                    return {...tl, filter: action.filter}
                } return tl
            })
        }
        default:
            throw new Error ("I don't understand this type")
    }
}

export const RemoveTodoListAC = (id: string) => {
    return { type: TypeActionType.REMOVE_TODOLIST,id } as const
}
export const AddTodoListAC = (title: string) => {
    return  { type:TypeActionType.ADD_TODOLIST, title, idTd: v1() } as const
}
export const ChangeTodoListTitleAC = ( id:string, title:string) => {
    return {type:TypeActionType.CHANGE_TODOLIST_TITLE, id, title} as const
}
export const ChangeTodoListFilterAC = (id:string, filter:FilterType) => {
    return {type: TypeActionType.CHANGE_TODOLIST_FILTER, id, filter} as const
}