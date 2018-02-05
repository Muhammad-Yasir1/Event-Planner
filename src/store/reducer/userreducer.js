import EventAction from "./../action/eventaction";
import customHistory from "../history/history"
const INITIAL_STATE = {
   users:{}
}

export default function UserReducer(state = INITIAL_STATE, action) {
    var newUsers = null;
    switch (action.type) {
        
        case EventAction.Add_User_Epic:
        // console.log(action);
        newUsers = Object.assign({}, state.users);
        newUsers[action.uid] = action.val 
        return { users: newUsers };

        case EventAction.Logout:
        customHistory.push('/');
        newUsers = {};
        
        return { users: newUsers};

        case EventAction.Edit_User_Epic:
        // console.log(action);        
        newUsers = Object.assign({}, state.users);
        newUsers[action.uid] = action.val ;
        return { users: newUsers };
        
        default:
            return state;
    }
}