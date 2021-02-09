import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string) => void
    filteredTask: (filter: FilterType) => void
    addTask: (inputTitle: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    filter: string
}

export function Todolist(props: PropsType) {

    let [inputTitle, setInputTitle] = useState("")
    let [error, setError] = useState<string|null>(null)

    const addTask = () => {
        if (inputTitle.trim() !== "") {
            props.addTask(inputTitle)
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

    const onClickHandlerAll = () => {props.filteredTask("all")}
    const onClickHandlerActive = ()=> {props.filteredTask("active")}
    const onClickHandlerCompleted = () => {props.filteredTask("completed")}




    return <div>
        <h3>{props.title}</h3>
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
                    const onClickHandler = () => props.deleteTask(t.id)
                    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue)
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
