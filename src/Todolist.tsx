import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

type TaskType = {
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
    filter: string
    removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

    let [inputTitle, setInputTitle] = useState("")
    let [error, setError] = useState<string|null>(null)

    const addTask = () => {
        if (inputTitle.trim() !== "") {
            props.addTask(inputTitle, props.id)
            setInputTitle("")
        } else {
            setError("Title is required")
        }

    }

    const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {setInputTitle(e.currentTarget.value)}

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.key === 'Enter') {
            addTask()
        }
    }

    const onClickHandlerAll = () => {props.filteredTask("all", props.id)}
    const onClickHandlerActive = ()=> {props.filteredTask("active", props.id)}
    const onClickHandlerCompleted = () => {props.filteredTask("completed", props.id)}
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }



    return <div>
        <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
        <div>
            <input value={inputTitle}
                   onChange={onChangHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.deleteTask(t.id, props.id)
                    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }
                    return <li key ={t.id} className={t.isDone ? "is-done": ""}>
                        <input type="checkbox" onChange={ onChangeHandler } checked={t.isDone}/>
                        <span>{t.title}</span>
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
