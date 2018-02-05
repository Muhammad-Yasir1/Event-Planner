import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TodoControlAction } from '../store/action/todoControlAction'
import  "./App.css";
import TodoForm from '../components/todoForm/todoForm';
import TodoItem from '../components/todoItem/todoItem';


function mapStateToProps(state) {
    return {
        todos: state.TodoReducer.todos,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        addTodo: (data) => dispatch(TodoControlAction.addTodo(data)),  
        deleteTodo: (key,index) => dispatch(TodoControlAction.deleteTodo(key,index)),  
        markAchiveTodo: (key, state) => dispatch(TodoControlAction.markAchiveTodo(key, state)),  
        editTodo: (key, editvalue) => dispatch(TodoControlAction.editTodo(key, editvalue)),  
        getTodo: () => dispatch(TodoControlAction.getTodo()),  
    };
}


class App extends Component {
    constructor(props) {
        super(props)
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.markAchiveTodo = this.markAchiveTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.props.getTodo();
    }

    addTodo(data) {
        this.props.addTodo({todo:data, isAchive:false});
    }
    
    editTodo(key, editvalue) {
        this.props.editTodo(key,editvalue);
    }

    markAchiveTodo(key, state) {
        console.log(key, state);
        this.props.markAchiveTodo(key, state);
    }

    deleteTodo(key, index) {
        this.props.deleteTodo(key, index);
    }

    render() {
        
        return (
            <div className='App'>
                <h1>Todo App</h1>
                <TodoForm addTodo={this.addTodo}/>
                {this.props.todos.map((val,ind)=>{
                    {/* console.log(val); */}
                   return Object.keys(val).map((key) =>{ 
                        let todo = val[key];
                        {/* console.log(todo)
                        console.log(`key=${key}` , todo); */}
                        return <TodoItem className='.App' key={key} keyy={key} index={ind} todo={todo}
                            deleteTodo={this.deleteTodo}
                            markAchiveTodo={this.markAchiveTodo}
                            editTodo={this.editTodo} />
                        })
                    })                    
                 }
            </div>
            )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)