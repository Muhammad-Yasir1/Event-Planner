import EventAction from "./../action/eventaction";

const INITIAL_STATE = {
   mainuser: {
       loginstate:false,
       mainuserid:null,
       loader: false,
       signerror:{type:null, state:false},
    },
}

export default function AuthReducer(state = INITIAL_STATE, action) {
    var newmainuser = {};
    switch (action.type) {
        
        case EventAction.Sign_In_User_Epic:
        // console.log(action);
        newmainuser = Object.assign({}, state.mainuser);
        newmainuser.loginstate = true;
        newmainuser.loader = false;
        newmainuser.mainuserid = action.uid;
        return { mainuser : newmainuser};
        
        case EventAction.Logout:
        newmainuser = Object.assign({}, state.mainuser);
        newmainuser.loginstate = false;
        newmainuser.loader = false;
        newmainuser.mainuserid = null;
        newmainuser.signerror = {type:null, state:false};
        return { mainuser : newmainuser};
        
        case 'Get_Posts':
        // console.log('loader');
        newmainuser = Object.assign({}, state.mainuser);
        newmainuser.loader = true;
        return { mainuser : newmainuser};
        
        case 'Sign_Up_Error':
        newmainuser = Object.assign({}, state.mainuser);
        newmainuser.signerror = {state : true, type: 'signuperror'};
        return { mainuser : newmainuser};
        
        case 'Sign_In_Error':
        newmainuser = Object.assign({}, state.mainuser);
        newmainuser.signerror = {state : true, type: 'signinerror'};
        return { mainuser : newmainuser};
        
        default:
            // console.log(action)
            return state;
    }
}