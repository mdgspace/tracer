import { act } from "react-dom/test-utils"

export interface Organization{
    name: string,
    description: string|null

}


export const orgReducer=(state: Organization[]=[], action:{
    type:string,
    payload: Organization
})=>{

    switch(action.type){
        case 'add':
            return state.concat(action.payload)
        
        case 'delete':
            return state.filter(elem=>elem!=action.payload)
        
        default:
            return state
    }
    
}



