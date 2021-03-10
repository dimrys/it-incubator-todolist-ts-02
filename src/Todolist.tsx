import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskId: string, todoListId: string) => void
    filteredTask: (filter: FilterType, todoListId: string) => void
    addTask: (inputTitle: string, todoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskItem: (taskID: string, title: string, todoListId: string) => void
    filter: string
    removeTodoList: (todoListId: string) => void
    changeTodoLisTitle: (todoListId: string, title: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    const onClickHandlerAll = () => {props.filteredTask("all", props.id)}
    const onClickHandlerActive = ()=> {props.filteredTask("active", props.id)}
    const onClickHandlerCompleted = () => {props.filteredTask("completed", props.id)}
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const onChangeTitleTodoListHandler = (title: string) => {
        props.changeTodoLisTitle(props.id, title)
    }



    return <div>
        <h3> <EditableSpan value={props.title} onChange={onChangeTitleTodoListHandler}/>
             <button onClick={removeTodoList}>x</button>
        </h3>
        <AddItemForm addItem={addTask} />

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.deleteTask(t.id, props.id)
                    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }
                    const onChangeItemTaskHandler = (title: string) => {
                        props.changeTaskItem(t.id, title, props.id)
                    }
                    return <li key ={t.id} className={t.isDone ? "is-done": ""}>
                        <input type="checkbox" onChange={ onChangeHandler } checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onChangeItemTaskHandler}/>
                        {/*<span>{t.title}</span>*/}
                        <button onClick={ onClickHandler}>X</button>
                    </li>
                })
            }

        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter": ""} onClick={onClickHandlerAll}>All</button>
            <button className={props.filter === "active" ? "active-filter": ""} onClick={onClickHandlerActive}>Active</button>
            <button className={props.filter === "completed" ? "active-filter": ""} onClick={onClickHandlerCompleted}>Completed</button>
        </div>
    </div>
}

