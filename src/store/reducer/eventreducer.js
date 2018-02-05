import EventAction from "./../action/eventaction";

const INITIAL_STATE = {
   posts:{},
}

export default function EventReducer(state = INITIAL_STATE, action) {
    var newPosts = null;
    switch (action.type) {
        case EventAction.Add_Event_Epic:
        newPosts = Object.assign({}, state.posts);
        newPosts[action.id] = action.data;
        return { posts: newPosts };

        case EventAction.Delete_Event_Epic:
        newPosts = Object.assign({}, state.posts);
        delete newPosts[action.key];
        return { posts: newPosts };
    
        case EventAction.Edit_Event_Epic:
        newPosts = Object.assign({}, state.posts);
        newPosts[action.key] = action.data ;
        // console.log(action);
        // console.log(newPosts);
        return { posts: newPosts};

        case EventAction.Logout:
        newPosts = {};
        return { posts: newPosts};

        default:
            return state;
    }
}