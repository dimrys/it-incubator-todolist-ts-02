import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type  FilterType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterType
}


function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()


    const [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to by", filter: "all"},

    ])

    const removeTodoList = (todoListId: string) => {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoList(newTodoLists)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title: title, filter: "all"}
        setTodoList([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }
    function changeTodoLisTitle(todoListId: string, title: string) {
        const todoListTitle = todoLists.find(t => t.id === todoListId)

        if (todoListTitle) {
            todoListTitle.title = title
            setTodoList([...todoLists])
        }
    }

    const [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "Rest api", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Sugar", isDone: false},
        ]
    })

    function deleteTask(taskId: string, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function addTask(inputTitle: string, todoListId: string) {
        const newTask = {id: v1(), title: inputTitle, isDone: false}
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todoListId: string) {
        let task = tasks[todoListId].find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskItem(taskID: string, title: string, todoListId: string) {
        let changeTask = tasks[todoListId].find(t => t.id === taskID)
        if (changeTask) {
            changeTask.title = title
            setTasks({...tasks})
        }
    }

    function filteredTask(filter: FilterType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = filter
            setTodoList([...todoLists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {
                    let tasksForToDoList = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForToDoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksForToDoList = tasks[tl.id].filter(t => t.isDone === true)
                    }


                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForToDoList}
                                     deleteTask={deleteTask}
                                     filteredTask={filteredTask}
                                     addTask={addTask}
                                     changeStatus={changeStatus}
                                     changeTaskItem = {changeTaskItem}
                                     filter={tl.filter}
                                     removeTodoList={removeTodoList}
                                     changeTodoLisTitle = {changeTodoLisTitle}
                    />
                })
            }


        </div>
    );
}

export default App;
