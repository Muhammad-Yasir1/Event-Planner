import {TodoControlAction} from '../action/todoControlAction';

const Initial_State = {
    todos : []
}

let newTodos = null;
export function TodoReducer(state = Initial_State, action ) {
    let ind = null;
    switch  (action.type){
        case TodoControlAction.Get_Todo_Epic:
            newTodos = [].concat(state.todos);
            newTodos.push(action.item);
            return {todos:newTodos};
        
        case TodoControlAction.Add_Todo_Epic:
            newTodos = [].concat(state.todos);
            let a ={};
            a[action.key] = action.item;
            newTodos.push(a);
            return {todos:newTodos};
        
        case TodoControlAction.Delete_Todo_Epic:
            newTodos = [].concat(state.todos);
            newTodos.splice(newTodos.findIndex((x) => { 
                return x.hasOwnProperty(action.key)}),1);
            return {todos:newTodos};

        case TodoControlAction.Mark_Achive_Todo_Epic:
            newTodos = [].concat(state.todos);
             ind = newTodos.findIndex((x) => { 
                return x.hasOwnProperty(action.key)});
            newTodos[ind][action.key].isAchive = action.state;
            return {todos:newTodos};
        
        case TodoControlAction.Edit_Todo_Epic:
            newTodos = [].concat(state.todos);
             ind = newTodos.findIndex((x) => { 
                return x.hasOwnProperty(action.key)});
            newTodos[ind][action.key].todo = action.editedtodo.todo ;
            newTodos[ind][action.key].isAchive = action.editedtodo.isAchive ;
            return {todos:newTodos};

        default:
            return state;
    }    
}