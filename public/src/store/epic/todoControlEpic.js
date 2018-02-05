import { Observable } from "rxjs";
import { TodoControlAction } from "./../action/todoControlAction";
import * as firebase from 'firebase';

const ref = firebase.database().ref('/');
// var arr = ['make','back','take']
// for(let i=0;i<3;i++){
//     let uid = ref.push().key;
//         ref.child(uid).set({
//             todo:arr[i],
//             isAchive: false
//         });
// }

let o = 0;
export class TodoEpic {

    static getTodo = (action$) =>
            action$.ofType(TodoControlAction.Get_Todo)
                .switchMap(() => {
                    return new Observable((observer) => {
                        ref.on("child_added", (snapshot) => {
                            // console.log('sd', o);
                            // o++;///////////HERERERERERERERER
                            // if(o>5){
                            //     console.log('sdsdssdsdsds');
                            //     ref.off();
                            //     return Observable.of(TodoControlAction.null())
                            // }
                            observer.next(TodoControlAction.addTodoEpic(snapshot.key, snapshot.val()))
                        })
                        
                        ref.on("child_changed", (snapshot) => {
                            observer.next(TodoControlAction.editTodoEpic(snapshot.key,snapshot.val()))
                        })
                        
                        ref.on("child_removed", (snapshot) => {
                            observer.next(TodoControlAction.deleteTodoEpic(snapshot.key,snapshot.val()))
                        })
                    })
                })
    
    static addTodo = (action$)=>{
        return action$.ofType(TodoControlAction.Add_Todo)
                .switchMap(({item})=>{
                    return Observable.fromPromise( ref.child(ref.push().key).set(item))
                    .map((x) => {
                    return  TodoControlAction.null() ;
                    })
                })
            }
    
    static deleteTodo = (action$)=>{
        return action$.ofType(TodoControlAction.Delete_Todo)
                .switchMap(({key})=>{
                    return Observable.fromPromise(ref.child(key).set(null))
                    .map((x) => {
                        return  TodoControlAction.null() ;
                    })
                })
            }
    
    static achiveTodo = (action$)=>{
        return action$.ofType(TodoControlAction.Mark_Achive_Todo)
                .switchMap(({key,state})=>{
                    return Observable.fromPromise( ref.child(key+'/'+'isAchive').set(state))
                    .map((x) => {
                        console.log(key,state);                    
                        return  TodoControlAction.null() ;
                    })
                })
            }
    
    static editTodo = (action$)=>{
        return action$.ofType(TodoControlAction.Edit_Todo)
                .switchMap(({key, editvalue})=>{
                    return Observable.fromPromise( ref.child(key+'/'+'todo').set(editvalue))
                    .map((x) => {
                        return  TodoControlAction.null() ;
                    })
                })
            }
}