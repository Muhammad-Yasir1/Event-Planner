import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Item from './item';

class GoingEvents extends Component{
    
    commentEvent = (key, uid, comment) => this.props.commentEvent(key, uid, comment);
    likeEvent = (key, uid, reaction) => this.props.likeEvent(key, uid, reaction);
    deleteEventFromGoing = (uid, key) => this.props.deleteEventFromGoing(uid, key);
    unlikeEvent = (key, uid) => this.props.unlikeEvent(key, uid);    

    render(){
        let goingkeysarr = [];
        let goingposts = [];
        let posts = [];
        let isposts = false;
        let noposts = <div className="m-5 eventitem dafault">
                        <h1 className="display-1 text-center noevent  eventname">No Events</h1>
                      </div>;
        let renderposts =  []; 
        if(this.props.users[this.props.mainuser].going != undefined){

        Object.keys(this.props.users[this.props.mainuser].going).map((key)=>{
                goingkeysarr.push({valkey:this.props.users[this.props.mainuser].going[key],key:key});
        });                          // post id                                // key in user going
        goingkeysarr.map((gkey)=>{
            let find = {find:false, unknownkey:null};
                find.unknownkey = gkey.key;
            Object.keys(this.props.posts).map((pkey)=>{
                if(pkey === gkey.valkey){ 
                    isposts = true;
                    find.find = true;
                    goingposts.push({val:pkey,key:gkey.key})
                }
            })
            if(!find.find){
                this.props.unknownevent(this.props.mainuser, find.unknownkey);
            }
        });
        goingposts.map((keyy)=>{
            posts.push({val: this.props.posts[keyy.val], key: keyy.val, onlyforgoing: keyy.key });
        });
        posts.sort((a ,b)=>{
            return new Date(a.val.postdata.eventdate) - new Date(b.val.postdata.eventdate)
        });

        posts.map((item, index)=> {
            // console.log(item); 
            // console.log(index); 
             renderposts.push(<Item key={item.key} itemtype='goingevents' onlyforgoing={item.onlyforgoing}
                                 keyy={item.key} 
                                index={index} item={item.val} users={this.props.users}
                                deleteEventFromGoing= {this.deleteEventFromGoing}
                                likeEvent={this.likeEvent} unlikeEvent={this.unlikeEvent}
                                commentEvent={this.commentEvent} posts={this.props.posts}
                                mainuser={this.props.mainuser}
                            />)        
              });
        }
        return( 
        <div>
            <h1 className='jumbo-bg-col p-3 text-center display-3 mb-5 mt-1'>Going Events</h1> 
            {isposts ? renderposts : noposts}
        </div>
      )
    }
}

export default GoingEvents;
