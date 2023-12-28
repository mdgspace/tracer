import { Dispatch } from "redux"


export const addProject = (project:[string,{archieve:boolean, bookmark:boolean}])=>{

    return(dispatch:Dispatch)=>{
        dispatch({
            type: 'add',
            payload: project
        })
    }
}

export const deleteProject= (project:[string,{archeive:boolean, bookmark:boolean}])=>{

    return(dispatch:Dispatch)=>{
        dispatch({
            type:'delete',
            payload: project
        })
    }
}