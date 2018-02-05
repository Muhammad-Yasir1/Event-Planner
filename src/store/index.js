import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

//requiring all reducers
import EventReducer from './reducer/eventreducer';
import UserReducer from './reducer/userreducer';
import AuthReducer from './reducer/auth';

//requiring all epics
import EventEpic from './epic/eventepic';

//combine epic
const rootEpic = combineEpics(
    EventEpic.addEvent,
    EventEpic.deleteEvent,
    EventEpic.editEventData,
    EventEpic.likeEvent,
    EventEpic.unlikeEvent,
    EventEpic.commentEvent,
    EventEpic.addUser,
    EventEpic.editUserPic,
    EventEpic.editUserName,
    EventEpic.editUserAbout,
    EventEpic.addEventToGoing,
    EventEpic.deleteEventFromGoing,
    EventEpic.getPosts,
    EventEpic.signIn,
    EventEpic.signUp,
    EventEpic.signUpWithFacebook,
    EventEpic.logout,
    EventEpic.unknownevent,

);
//combine reducers
const rootReducer = combineReducers({
    EventReducer,
    UserReducer,
    AuthReducer
});

//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

//creating store
export let store = createStoreWithMiddleware(rootReducer)
