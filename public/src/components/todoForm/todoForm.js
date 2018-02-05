import React, { Component } from 'react';
import "./todoForm.css";
class TodoForm  extends Component {
    constructor(){
        super();
        this.state = {
            inputText : ''
        };
        this.addTodo = this.addTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTodo(e){
        e.preventDefault();
        if(this.state.inputText !== ''){
            this.props.addTodo(this.state.inputText);
        }
        else{
            alert('Please Write in Text Box');
        }
        this.state.inputText = '';
    }
    handleChange(e){
        this.setState({
           inputText : e.target.value
        });
    }

    render(){
       return(
           <div>
                <form onSubmit={this.addTodo}>
                    <input className='inp' type="text" placeholder="Todo" onChange={this.handleChange} value={this.state.inputText}/>
                    <button className='btn' type="Submit" >Add Todo</button>
                </form>
            </div>
       ); 
    }
}

export default TodoForm;