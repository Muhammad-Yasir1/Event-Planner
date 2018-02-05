import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Item from './item';

class AllEvents extends Component{
    addEventToGoing = (uid, key) => this.props.addEventToGoing(uid, key);
    commentEvent = (key, uid, comment) => this.props.commentEvent(key, uid, comment);
    likeEvent = (key, uid, reaction) => this.props.likeEvent(key, uid, reaction);    
    unlikeEvent = (key, uid) => this.props.unlikeEvent(key, uid);    
    render(){
      let ispost = false;
      let posts = []
      let noposts= <div className="m-5 eventitem dafault">
                        <h1 className="display-1 text-center noevent  eventname">No Events</h1>
                    </div>
          if(this.props.posts != undefined ){
          Object.keys(this.props.posts).map((key,index)=> {
              let going = false;       
              if(this.props.posts[key].creater !== this.props.mainuser){
                //   console.log(this.props.posts[key]);
                    if(this.props.users[this.props.mainuser].going !== undefined){
                        Object.keys(this.props.users[this.props.mainuser].going).map((keyy)=>{
                        //   console.log(this.props.posts[key]);          
                           if(this.props.users[this.props.mainuser].going[keyy] === key){
                                // console.log(this.props.posts[key]);                  
                                going = true;
                           }
                        });
                    }
                    // console.log(going);
                    if(!going){
                    //   console.log(this.props.posts[key]);              
                      ispost = true;
                      posts.push(    
                            <Item itemtype='allevents' key={key} keyy={key} index={index} item={this.props.posts[key]} 
                            addEventToGoing= {this.addEventToGoing} unlikeEvent={this.unlikeEvent} users={this.props.users}
                            likeEvent={this.likeEvent} commentEvent={this.commentEvent} mainuser={this.props.mainuser}
                            posts={this.props.posts}
                        />)
                    }
            }
        })
    }
      return(<div>
            <h1 className='jumbo-bg-col p-3 text-center display-3 mb-5 mt-1'>All Events</h1> 
              {ispost ? posts : noposts}
             </div>
          )
    }
}

export default AllEvents;