import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type  FilterType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    const todoListId1 = v1()
    const todoListId2 = v1()



    const [todoLists, dispatchToTodoList] = useReducer(todoListReducer, [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to by", filter: "all"},

    ])

    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatchToTodoList(action)
        dispatchToTask(action)
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTask(action)
    }

    function changeTodoLisTitle(todoListId: string, title: string) {
        dispatchToTodoList(ChangeTodoListTitleAC(todoListId, title))
    }

    function filteredTask(filter: FilterType, todoListId: string) {
        dispatchToTodoList(ChangeTodoListFilterAC(todoListId, filter))
    }

    const [tasks, dispatchToTask] = useReducer(tasksReducer, {
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
        dispatchToTask(removeTaskAC(taskId, todoListId))
    }

    function addTask(inputTitle: string, todoListId: string) {
        dispatchToTask(addTaskAC(inputTitle, todoListId))
    }

    function changeStatus(taskID: string, isDone: boolean, todoListId: string) {
        dispatchToTask(changeTaskStatusAC(taskID, isDone, todoListId))
    }

    function changeTaskItem(taskID: string, title: string, todoListId: string) {
      dispatchToTask(changeTitleStatusAC(taskID, title, todoListId))
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
                                     changeTaskItem={changeTaskItem}
                                     filter={tl.filter}
                                     removeTodoList={removeTodoList}
                                     changeTodoLisTitle={changeTodoLisTitle}
                    />
                })
            }


        </div>
    );
}

export default AppWithReducers;
