import { Dispatch } from "redux"
import { Organization } from "../reducers/orgReducers"






export const AddOrganization= (org:Organization)=>{
    return(dispatch:Dispatch)=>{
       dispatch({ type:'add',
        payload:org})
    }
}

export const DeleteOrg=(org:Organization)=>{
    return(dispatch:Dispatch)=>{
      dispatch({
        type:'delete',
        payload:org
      })
    }
}