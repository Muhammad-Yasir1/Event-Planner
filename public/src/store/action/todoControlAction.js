export class TodoControlAction {
    static Add_Todo = "Add_Todo";
    static Add_Todo_Epic = "Add_Todo_Epic";
    static Delete_Todo = "Delete_Todo";
    static Delete_Todo_Epic = "Delete_Todo_Epic";
    static Edit_Todo = "Edit_Todo";
    static Edit_Todo_Epic = "Edit_Todo_Epic";
    static Mark_Achive_Todo = "Mark_Achive_Todo";
    static Mark_Achive_Todo_Epic = "Mark_Achive_Todo_Epic";
    static Get_Todo = 'Get_Todo';
    static Get_Todo_Epic = 'Get_Todo_Epic';
    static Set_Todo = 'Set_Todo';
    static Null = 'Null';


    static  addTodo(item) {
        return {type:TodoControlAction.Add_Todo, item:item};
    } 
    
    static  getTodo() {
        return {type:TodoControlAction.Get_Todo};
    } 
    
    static  getTodoEpic() {
        return {type:TodoControlAction.Get_Todo_Epic};
    } 
    
    static  setTodo() {
        return {type:TodoControlAction.Set_Todo};
    } 
    
    static  addTodoEpic(key, item) {
        return {type:TodoControlAction.Add_Todo_Epic, key:key, item:item};
    } 
    
    static  deleteTodo(key, index) {
        return {type:TodoControlAction.Delete_Todo, key:key, index:index};
    } 
    
    static  deleteTodoEpic(key, val) {
        return {type:TodoControlAction.Delete_Todo_Epic, key:key, val:val};
    } 
    
    static  editTodo(key, editvalue) {
        return {type:TodoControlAction.Edit_Todo,key:key, editvalue:editvalue};
    } 
    
    static  editTodoEpic(key, editedtodo) {
        return {type:TodoControlAction.Edit_Todo_Epic, key:key, editedtodo:editedtodo};
    } 
    
    static  markAchiveTodoEpic(key , state) {
        return {type:TodoControlAction.Mark_Achive_Todo_Epic, key:key, state:state };
    } 
    
    static  markAchiveTodo(key , state) {
        return {type:TodoControlAction.Mark_Achive_Todo, key:key, state:state };
    } 
    
    static  null() {
        return {type:TodoControlAction.Null};
    } 


}
