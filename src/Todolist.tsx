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
}

export function Todolist(props: PropsType) {

    let [inputTitle, setInputTitle] = useState("")

    const addTask = () => {
        props.addTask(inputTitle)
        setInputTitle("")
    }

    const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {setInputTitle(e.currentTarget.value)}

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { if(e.key === 'Enter') {addTask()}}



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputTitle}
                   onChange={onChangHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>

            {props.tasks.map(t =>
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => { props.deleteTask(t.id)}}>X</button>
                </li>
            )}
        </ul>
        <div>
            <button onClick={() => {props.filteredTask("all")}}>All</button>
            <button onClick={()=> {props.filteredTask("active")}}>Active</button>
            <button onClick={() => {props.filteredTask("completed")}}>Completed</button>
        </div>
    </div>
}
