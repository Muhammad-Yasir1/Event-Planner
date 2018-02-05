import React, { Component } from 'react';
import './todoItem.css';
class TodoItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEdit : false,
            editText : this.props.todo.todo,
        }
        this.editHandle = this.editHandle.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
        this.markAchiveTodo = this.markAchiveTodo.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        
    }
    editHandle(e){
        this.setState({
            editText : e.target.value,            
        });
    }
    
    deleteTodo(key, index){
        // e.stopPropagation();
        this.props.deleteTodo(key, index);
    }
    
    saveEdit(e){
        e.preventDefault();
        this.props.editTodo(this.props.keyy,this.state.editText);
        this.setState({
            isEdit:false            
        });
    }
    
    exitEditMode(e){
        this.setState({
            isEdit:false,              
            editText: this.props.todo.todo         
        });
    }
    
    toggleEdit(e){
        e.stopPropagation();
        this.setState({
            isEdit:true                        
        });
    }
    
    markAchiveTodo(){
        this.props.markAchiveTodo(this.props.keyy, !this.props.todo.isAchive);
    }

    editMode(){

        return (
          <li className={this.props.todo.isAchive ? 'com' : 'li'}>
                <input className='inp'  type="text" value={this.state.editText} onChange={this.editHandle} />
                <button className='btn' onClick={this.saveEdit}>Save</button>
                <button className='btn' onClick={this.exitEditMode}>Exit</button>
          </li>
        );
    }
    
    makeTodo(){
        return (
          <li key={this.props.index} onClick={this.markAchiveTodo} className={this.props.todo.isAchive?'com':'li'}>
            {this.props.todo.todo}
            <button className='btn'  onClick={(e)=>{e.stopPropagation();this.deleteTodo(this.props.keyy, this.props.index)}}>Delete</button>
            <button className='btn' onClick={this.toggleEdit}>Edit</button>
          </li>
        );
    }

    render(){
        return( 
            this.state.isEdit ? this.editMode() : this.makeTodo()            
        );
    }
}

export default TodoItem;