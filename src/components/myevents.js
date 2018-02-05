import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  EditEventModal  from "./editeventmodal";
import  ProfileModal  from "./profilemodal";
import  LikeModal  from "./likemodal";
import  CommentModal  from "./commentmodal";
import  './stylesheet.css';
import  './bootstrap.css';
import Item from "./item";

class MyEvents extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        // console.log(this.props.posts);
        // console.log(this.props.users);
    }
  
    editEvent = (key, data) => this.props.editEvent(key, data);
    deleteEvent = (key) => this.props.deleteEvent(key);
    commentEvent = (key, uid, comment) => this.props.commentEvent(key, uid, comment);
    likeEvent = (key, uid, reaction) => this.props.likeEvent(key, uid, reaction);
    unlikeEvent = (key, uid) => this.props.unlikeEvent(key, uid);
    
    render(){    
      let isposts = false;
      let noposts= <div className="m-5 eventitem dafault">
                    <h1 className="display-1 text-center noevent  eventname">No Events</h1>
                   </div>
      let posts = [];
            if(this.props.posts !== undefined ){
              Object.keys(this.props.posts).map((key,index)=> {       
              // console.log(this.props.posts[key].creater === this.props.mainuser);
                  if(this.props.posts[key].creater === this.props.mainuser){
                     isposts = true;
                     posts.push(<Item itemtype='myevents'  key={key} keyy={key} index={index} item={this.props.posts[key]} 
                          editEvent={this.editEvent} deleteEvent={this.deleteEvent} 
                          likeEvent={this.likeEvent} unlikeEvent={this.unlikeEvent}
                          commentEvent={this.commentEvent} users={this.props.users}
                          mainuser={this.props.mainuser} posts={this.props.posts}
                        />)
                  }
                })
              }
        return( 
      <div ref='maindiv'>  
        <h1 className='jumbo-bg-col p-3 text-center display-3 mb-5 mt-1'>My Events</h1>  
        {isposts?posts:noposts}
      
      </div>
      );
    }
  }
export default MyEvents;
