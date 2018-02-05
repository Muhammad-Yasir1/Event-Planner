import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { TodoReducer } from './reducer/todoControl'
import { TodoEpic } from './epic/todoControlEpic'

const rootEpic = combineEpics(
    TodoEpic.addTodo,
    TodoEpic.deleteTodo,
    TodoEpic.achiveTodo,
    TodoEpic.editTodo,
    TodoEpic.getTodo,

);

const rootreducer = combineReducers({
    TodoReducer
})

const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleWare = applyMiddleware(epicMiddleware)(createStore);
export let store = createStoreWithMiddleWare(rootreducer)


