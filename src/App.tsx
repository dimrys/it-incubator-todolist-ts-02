import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type  FilterType = "all" | "active" | "completed"


function App() {


    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
        { id: v1(), title: "Rest api", isDone: false }
    ])
    let [filter, setFilter] = useState<FilterType>("all")

    function deleteTask (id: string)  {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask (inputTitle: string) {
        const newTask = {id: v1(), title: inputTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    
    function changeStatus(taskID: string, isDone: boolean) {
        let task = tasks.find(t => t.id ===taskID)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    function filteredTask( filter:FilterType ) {
        setFilter(filter)
    }

    let tasksForToDoList = tasks

    if (filter === "active"){
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed"){
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    }




    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForToDoList}
                deleteTask = {deleteTask}
                filteredTask = {filteredTask}
                addTask = {addTask}
            />

        </div>
    );
}

export default App;
