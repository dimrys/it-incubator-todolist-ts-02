import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";

export type  FilterType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    // const todoListId1 = v1()
    // const todoListId2 = v1()

    const todoLists = useSelector<RootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<RootStateType, TaskStateType>(state => state.task)
    const dispatch = useDispatch()

    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatch(action)
    }

    function changeTodoLisTitle(todoListId: string, title: string) {
        dispatch(ChangeTodoListTitleAC(todoListId, title))
    }

    function filteredTask(filter: FilterType, todoListId: string) {
        dispatch(ChangeTodoListFilterAC(todoListId, filter))
    }



    function deleteTask(taskId: string, todoListId: string) {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    function addTask(inputTitle: string, todoListId: string) {
        dispatch(addTaskAC(inputTitle, todoListId))
    }

    function changeStatus(taskID: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListId))
    }

    function changeTaskItem(taskID: string, title: string, todoListId: string) {
      dispatch(changeTitleStatusAC(taskID, title, todoListId))
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

export default AppWithRedux;
