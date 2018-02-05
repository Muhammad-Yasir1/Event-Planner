import { Observable } from "rxjs";
import EventAction from "./../action/eventaction";
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAYdXql6BP9Gc7_uaehiff3Xas_mnDJdUw",
    authDomain: "event-planner-1.firebaseapp.com",
    databaseURL: "https://event-planner-1.firebaseio.com",
    projectId: "event-planner-1",
    storageBucket: "event-planner-1.appspot.com",
    messagingSenderId: "898502873021"
  };
  firebase.initializeApp(config);

    
const ref = firebase.database();

export default class EventEpic {

        static addEvent = (action$) =>
        action$.ofType(EventAction.Add_Event)
            .switchMap(({data}) => {
                return Observable.fromPromise(ref.ref('/posts/').push(data))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
        
        static signIn = (action$) =>{
          return action$.ofType(EventAction.Sign_In)
            .switchMap(({email, password, getPosts}) => {
                // console.log(email, password, getPosts);
                return Observable.fromPromise( firebase.auth().signInWithEmailAndPassword(email, password)
                        .then((res)=>{
                            // console.log(res);
                            // console.log(res.uid);
                            // console.log(getPosts); 
                            
                           return {type: EventAction.Get_Posts, uid: res.uid};
                        })
                        .catch((res)=>{ return {type:'Sign_In_Error'};
                            }))
                            // .map((x)=>{ return  {type:null}});                
                        })}
                
        static signUp = (action$) =>{
            return action$.ofType(EventAction.Sign_Up)
            .switchMap((action) => {
                // console.log(action);
                // console.log(action.email, action.password);                
                let uid;
                let user;
                let iserror = false;
                return Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword( action.email, action.password)
                    .then((res)=>{
                        // console.log(res);
                         uid = res.uid;
                        //  console.log(action.email[0]);
                         user = {
                            username:action.email,
                            userpic: require('../../images/alphabet/'+action.email[0]+'.png'),
                            userabout:'Hi, I am '+action.email,
                            useremail: action.email,
                            userpassword: action.password
                        }
                    }
                )
                    .catch((res)=>{ iserror = true; return {type:null}})    
                ).map((x)=>{
                    // console.log(uid, user);
                    if(iserror){
                        return {type:'Sign_Up_Error'};                        
                    }
                    else{
                        return EventAction.addUser(uid, user);
                    }
                });    
                }
            )
        }

                
        static signUpWithFacebook = (action$) =>{
            return action$.ofType('Sign_Up_With_Facebook')
            .switchMap((action) => {
                // console.log(action);
                // console.log(action.email, action.password);                
                let uid;
                let user;
                let iserror = false;
                return Observable.fromPromise(firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
                    .then((res)=>{
                        // console.log(res);
                         uid = res.user.uid;
                        //  console.log(res.user.displayName);
                        //  console.log(res.user.photoURL);
                        //  console.log(res.user.email);
                         user = {
                            username:res.user.displayName,
                            userpic: res.user.photoURL,
                            userabout:'',
                            useremail: res.user.email,
                            // userpassword: action.password
                        }
                    }
                )
                    .catch((res)=>{ iserror = true;  return {type:null}})    
                ).map((x)=>{
                    // console.log(uid, user);
                    if(iserror){
                        return {type:'Sign_Up_Error'};                        
                    }
                    else{
                        return {type:null};
                        // return EventAction.addUser(uid, user);
                    }
                });    
                }
            )
        }

        

        static deleteEvent = (action$) =>
        action$.ofType(EventAction.Delete_Event)
            .switchMap(({key}) => {
                return Observable.fromPromise(ref.ref('/posts/'+key+'').set(null))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
        static editEventData = (action$) =>
        action$.ofType(EventAction.Edit_Event_Data)
            .switchMap(({key, data}) => {
                return Observable.fromPromise(ref.ref('/posts/'+key+'/postdata').set(data))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
        static likeEvent = (action$) =>
        action$.ofType(EventAction.Like_Event)
            .switchMap(({key, uid, reaction}) => {
                let obj = {};
                let date = new Date();
                obj[date] = reaction;
                // console.log(key, uid, reaction);
                return Observable.fromPromise(ref.ref('/posts/'+key+'/likes/'+uid).set(obj))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
    
        static unlikeEvent = (action$) =>
        action$.ofType(EventAction.Un_Like_Event)
            .switchMap(({key, uid}) => {
                // console.log(key, uid);
                return Observable.fromPromise(ref.ref('/posts/'+key+'/likes/'+uid).set(null))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
        static commentEvent = (action$) =>
        action$.ofType(EventAction.Comment_Event)
            .switchMap(({key, uid, comment}) => {
                // console.log(key, uid, comment);
                let obj = {};
                let date = new Date();
                obj[uid] = comment;
                return Observable.fromPromise(ref.ref('/posts/'+key+'/comments/'+date).set(obj))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
        static addUser = (action$) =>
        action$.ofType(EventAction.Add_User)
            .switchMap((a) => {
                let ii;
                // console.log(a);                
                return Observable.fromPromise(ref.ref('/users/'+a.uid).set(a.user)
                                .then(()=>{
                                return  firebase.auth().signInWithEmailAndPassword(a.user.useremail, a.user.userpassword)
                                    .then((res)=>{
                                        ii = res.uid;
                                        // console.log(res.uid);
                                    return {type: null, uid: res.uid}
                                })                
                                    }
                                ))
                    .map((x) => {
                        // console.log('ssss'+a);
                        return  {type: EventAction.Get_Posts, uid: ii}//{type: null}  
                    })
                })
    
        // static addUser = (action$) =>
        // action$.ofType(EventAction.Add_User)
        //     .switchMap((a) => {
        //         let ii;
        //         console.log(a);                
        //         return Observable.fromPromise(ref.ref('/users/'+a.uid).set(a.user).then(()=>{console.log('add then')}))
        //             .map((x) => {
        //                 console.log(a);
        //             return  firebase.auth().signInWithEmailAndPassword(a.user.useremail, a.user.userpassword)
        //                 .then((res)=>{
        //                     ii = res.uid;
        //                     console.log(res.uid);
        //                 //  return {type:null}
        //                  return {type: EventAction.Get_Posts, uid: res.uid}
        //                 })
        //             .catch((res)=>{alert(res.message);return EventAction.Null});
        //             }).map((x)=>{
        //                 return  {type: null};
        //             });  
        //     })
    
        static editUserPic = (action$) =>
        action$.ofType(EventAction.Edit_User_Pic)
            .switchMap(({uid, pic}) => {
                // console.log(uid, pic);
                return Observable.fromPromise(ref.ref('/users/'+uid+'/userpic').set(pic))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
    
        static editUserName = (action$) =>
        action$.ofType(EventAction.Edit_User_Name)
            .switchMap(({uid, editedname}) => {
                // console.log(uid, editedname);
                return Observable.fromPromise(ref.ref('/users/'+uid+'/username').set(editedname))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
    
        static editUserAbout = (action$) =>
        action$.ofType(EventAction.Edit_User_About)
            .switchMap(({uid, editedabout}) => {
                return Observable.fromPromise(ref.ref('/users/'+uid+'/userabout').set(editedabout))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
        static addEventToGoing = (action$) =>
        action$.ofType(EventAction.Add_Event_To_Going)
            .switchMap(({uid, key}) => {
                return Observable.fromPromise(ref.ref('/users/'+uid+'/going/').push(key))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
        static deleteEventFromGoing = (action$) =>
        action$.ofType(EventAction.Delete_Event_From_Going)
            .switchMap(({uid, key}) => {
                // console.log(uid, key);           
                return Observable.fromPromise(ref.ref('/users/'+uid+'/going/'+key).set(null))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
            })
    
        static logout = (action$) =>
        action$.ofType(EventAction.Logout)
            .switchMap(() => {
                return new Observable((observer) => {
                    ref.ref('/posts').off();                    
                    ref.ref('/users').off();
                }                    
            )  
        })
        static unknownevent = (action$) =>
        action$.ofType(EventAction.Un_Known_Event)
            .switchMap(({uid, key}) => {
                // console.log(uid, key);           
                return Observable.fromPromise(ref.ref('/users/'+uid+'/going/'+key).set(null))
                    .map((x) => {
                        return { type: EventAction.Null };
                    })  
                }                    
            )      

        static getPosts = (action$) =>
        action$.ofType(EventAction.Get_Posts)
            .switchMap((a) => {
                // console.log(a);
                // console.log(a.uid);
                return new Observable((observer) => {
                    let userfind = false;
                    let redi;
                    let keyfind;
                    ref.ref('/posts').on("child_added", (snapshot) => {
                        // console.log(snapshot.key);
                        // console.log(snapshot.val());
                        observer.next(EventAction.addEventEpic(snapshot.key,snapshot.val()))
                    })  
                    ref.ref('/posts').on("child_changed", (snapshot) => {
                        // console.log(snapshot.key);
                        // console.log(snapshot.val());
                        observer.next(EventAction.editEventEpic(snapshot.key,snapshot.val()))
                    })
                    ref.ref('/posts').on("child_removed", (snapshot) => {
                        // console.log(snapshot.key);
                        // console.log(snapshot.val());
                        observer.next(EventAction.deleteEventEpic(snapshot.key,snapshot.val()))
                    })
                    ref.ref('/users').on("child_added",(snapshot) => {
                        // console.log(snapshot.key);
                        // console.log(a.uid);
                        // console.log(snapshot.val());
                        if(snapshot.key === a.uid){
                            // console.log(snapshot.key, a.uid);
                            keyfind = snapshot.key;
                            redi = setTimeout(()=>{observer.next(EventAction.signInUserEpic(keyfind));},2000);
                            userfind = true;
                        }
                        else if(userfind){
                            // console.log('else if');                        
                            clearTimeout(redi)
                            redi = setTimeout(()=>{observer.next(EventAction.signInUserEpic(keyfind));},2000);                            
                        }
                        // console.log('after');
                        observer.next(EventAction.addUserEpic(snapshot.key,snapshot.val()))
                    })
                    ref.ref('/users').on("child_changed", (snapshot) => {
                        // console.log(snapshot.key);
                        // console.log(snapshot.val());
                        observer.next(EventAction.editUserEpic(snapshot.key,snapshot.val()))
                    })
                })
            })

}