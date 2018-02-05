
class  EventAction {

    static Get_Posts = 'Get_Posts';

    static Edit_Event_Data = 'Edit_Event_Data';
    static Un_Known_Event = 'Un_Known_Event';
    static Delete_Event = 'Delete_Event';
    static Add_Event = 'Add_Event';
    static Like_Event = 'Like_Event';
    static Un_Like_Event = 'Un_Like_Event';
    static Comment_Event = 'Comment_Event';
    static Delete_Event_From_Going = 'Delete_Event_From_Going';
    static Add_Event_To_Going = 'Add_Event_To_Going';
    
    static Edit_User_Pic = 'Edit_User_Pic';
    static Edit_User_Name = 'Edit_User_Name';
    static Edit_User_About = 'Edit_User_About';
    
    static Edit_Event_Epic = 'Edit_Event_Epic';
    static Delete_Event_Epic = 'Delete_Event_Epic';
    static Add_Event_Epic = 'Add_Event_Epic';
     
    static Edit_User_Epic = 'Edit_User_Epic';
    static Edit_User = 'Edit_User';
    static Add_User_Epic = 'Add_User_Epic';
    static Add_User = 'Add_User';
    static Sign_In = 'Sign_In';
    static Sign_Up = 'Sign_Up';
    static Sign_In_User_Epic = 'Sign_In_User_Epic';
    static Sign_Up_User_Epic = 'Sign_Up_Uper_Epic';
    
    static Logout = 'Logout';
    static Null = 'Null';
    
    static getPosts(uid) {
        // console.log('ss');
        // console.log(uid);
        return { type: EventAction.Get_Posts, uid: uid}
    }        
    
    static addEvent(data) {
        return { type: EventAction.Add_Event, data: data}
    }        
    
    static addEventEpic(id, data) {
        return { type: EventAction.Add_Event_Epic, data: data, id: id}
    }        

    static editEvent(key, data) {
        return { type: EventAction.Edit_Event_Data, key: key, data: data }
    }        
    
    static editEventEpic(key, data) {
        return { type: EventAction.Edit_Event_Epic, key: key, data: data }
    }        
    
    static deleteEvent(key) {
        return { type: EventAction.Delete_Event, key: key}
    }        
    
    static deleteEventEpic(key) {
        return { type: EventAction.Delete_Event_Epic, key: key}
    }        
    
    static commentEvent(key, uid, comment) {
        return { type: EventAction.Comment_Event, key:key,  uid: uid, comment: comment}
    }        
    
    static likeEvent(key, uid, reaction) {
        return { type: EventAction.Like_Event, key:key, uid: uid, reaction: reaction}
    }        
    
    
    static unlikeEvent(key, uid) {
        return { type: EventAction.Un_Like_Event, key:key, uid: uid}
    }        
    
    static editUserPic(uid, pic) {
        return { type: EventAction.Edit_User_Pic, uid: uid, pic: pic}
    }        
    
    static editUserName(uid, editedname) {
        return { type: EventAction.Edit_User_Name, uid: uid, editedname: editedname}
    }        
    
    static editUserAbout(uid, editedabout) {
        return { type: EventAction.Edit_User_About, uid: uid, editedabout: editedabout}
    }        
    
    static editUserEpic(uid, val) {
        return { type: EventAction.Edit_User_Epic, uid: uid, val: val}
    }        
            
    static addUserEpic(uid, val) {
        return { type: EventAction.Add_User_Epic, uid: uid, val: val}
    }        
            
    static addUser(uid, user) {
        // console.log(uid, user)
        return { type: EventAction.Add_User, uid: uid, user: user}
    }        
    
    static deleteEventFromGoing(uid, key){
        return { type: EventAction.Delete_Event_From_Going, uid:uid, key :key }
    }
    
    static unknownevent(uid, key){
        return { type: EventAction.Un_Known_Event, uid:uid, key :key }
    }

    static addEventToGoing(uid, key){
        return { type: EventAction.Add_Event_To_Going, uid:uid, key :key }        
    }

    static signIn(email, password, getPosts){
        // console.log(email, password);
        return { type: EventAction.Sign_In, email: email, password: password, getPosts: getPosts }        
    }

    static signUp(email, password){
        // console.log(email, password);
        return { type: EventAction.Sign_Up, email: email, password: password }        
    }

    static signInUserEpic(uid){
        // console.log(uid);
        return { type: EventAction.Sign_In_User_Epic, uid:uid}        
    }
 
    static signUpUserEpic(uid){
        return { type: EventAction.Sign_Up_User_Epic, uid:uid}        
    }


}

export default EventAction;