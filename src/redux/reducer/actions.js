import * as type from './jokeTypes'
import axios from 'axios'

export const fetchJokes=()=>{
    return{
        type: type.FETCH_JOKES
    }
}

export const jokesSuccess=(data)=>{
    return{
        type: type.FETCH_JOKES_SUCCESS,
        payload: data
    }
}

export const jokesFailure=(error)=>{
    return{
        type: type.FETCH_JOKES_FAILURE,
        payload: error
    }
}

export const jokes=()=>{

    return(dispatch)=>{

        dispatch(fetchJokes)

        axios.get("https://official-joke-api.appspot.com/jokes/ten")

        .then(response=>{

        // console.log(response)
        dispatch(jokesSuccess(response.data))

        }).catch(error=>{console.log(error)

        dispatch(jokesFailure(error.message))})
    }
}


export const login=(name,password)=>{
    return(dispatch)=>{
        console.log(name,password)
        window.location.href = "/dashboard"
        sessionStorage.setItem("login",true)
    }
}

export const logout=()=>{
    return(dispatch)=>{
        sessionStorage.removeItem("login")
        sessionStorage.removeItem("tasks")
        sessionStorage.removeItem("editTasks")
        sessionStorage.removeItem("status")
        window.location.href = "/login"
    }
}

export const checkLogin = () => {
   let value = sessionStorage.getItem("login")
   console.log(value)
   return value ? value : false
}

export const tasks = () => {
    let tasks = []
    // console.log(sessionStorage.getItem("tasks"))
    tasks = sessionStorage.getItem("tasks")
    // console.log("tasks"+tasks)
    return  tasks !==  null ? JSON.parse(tasks) : []
 }

 export const editTask = () => {
    let tasks = []
    tasks = sessionStorage.getItem("editTasks")
    console.log("tasks"+tasks)
    return tasks !==  null ? JSON.parse(tasks) : []
 }

 export const editRow = (row) =>{
    return(dispatch)=>{
        let editList = JSON.stringify(row)
        sessionStorage.setItem("editTasks",editList)
        window.location.href = "/editTask"
    }
 }

export const addTask=(data)=>{
    return(dispatch)=>{
        let addlist = JSON.stringify(data)
        sessionStorage.setItem("tasks",addlist)
        window.location.href = "/viewTasks"
    }
}

