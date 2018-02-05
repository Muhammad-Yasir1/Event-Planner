import  React, { Component } from 'react';
import  ReactDOM from 'react-dom';
import  EditEventModal  from "./editeventmodal";
import  ProfileModal  from "./profilemodal";
import  LikeModal  from "./likemodal";
import  CommentModal  from "./commentmodal";

import  './stylesheet.css';
import  './bootstrap.css';


export default class Item extends Component{
    constructor(props){
      super(props)
      this.state = {
        isopeneditmodal:false,
        isopenprofilemodal:false,
        isopenlikemodal:false,
        isopencommentmodal:false
      }
    }
  
    mainIconClick = ()=>{
    
  if(this.props.item.likes === undefined || this.props.item.likes[this.props.mainuser] === undefined){
    if(this.refs.popover.style.display === 'block'){
      
      setTimeout(()=>{this.refs.love.style.animation = 'p1animationrev 0.5s ease-in-out 0s 1 alternate forwards';}, 600);
      setTimeout(()=>{this.refs.haha.style.animation = 'p2animationrev 0.5s ease-in-out 0s 1 alternate forwards';}, 500);
      setTimeout(()=>{this.refs.wow.style.animation = 'p3animationrev 0.5s ease-in-out 0s 1 alternate forwards';}, 400);
      setTimeout(()=>{this.refs.like.style.animation = 'p4animationrev 0.5s ease-in-out 0s 1 alternate forwards';}, 300);
      setTimeout(()=>{this.refs.angry.style.animation = 'p5animationrev 0.5s ease-in-out 0s 1 alternate forwards';}, 200);
      setTimeout(()=>{this.refs.sad.style.animation = 'p6animationrev 0.5s ease-in-out 0s 1 alternate forwards';}, 100);

      setTimeout(()=>{
          this.refs.love.style.animation = 'p1animation 0.5s ease-in-out 0.1s 1 alternate forwards';
          this.refs.haha.style.animation = 'p2animation 0.5s ease-in-out 0.2s 1 alternate forwards';
          this.refs.wow.style.animation = 'p3animation 0.5s ease-in-out 0.3s 1 alternate forwards';
          this.refs.like.style.animation = 'p4animation 0.5s ease-in-out 0.4s 1 alternate forwards';
          this.refs.angry.style.animation = 'p5animation 0.5s ease-in-out 0.5s 1 alternate forwards';
          this.refs.sad.style.animation = 'p6animation 0.5s ease-in-out 0.57s 1 alternate forwards';
                      this.refs.popover.style.display = 'none';
                    }
      ,1100);
    }
    else{
        this.refs.popover.style.display = 'block';   
        this.refs.popover.style.zIndex = '1' ;    
        
      }

    }
    else{      
      this.props.unlikeEvent(this.props.keyy, this.props.mainuser);
    }
  }
    middleMainIcon = ()=>{
      this.mainIconClick();    
    }
  
    reactionClick = (a)=>{
      let imgMultiple = ReactDOM.findDOMNode(this.refs.itemone).getElementsByClassName('multipleimage');          
      let reaction = a.target.name;
      setTimeout(()=>this.props.likeEvent(this.props.keyy, this.props.mainuser, reaction ),1000); 
      this.mainIconClick();
      setTimeout(()=>{
        for(let i = 0; i<8 ; i++){
          imgMultiple[i].style.display =  'block';
          imgMultiple[i].src = require("../images/"+reaction+".png");
        }
      },1130);
      setTimeout(()=>{
        for(let i = 0; i<8 ; i++){
          imgMultiple[i].style.display =  'none';
        }
      },2130);
    }
  
    commentEvent= ()=>{
      // console.log(this.refs.commentinput.value);
      // console.log(this.props.keyy);
      // console.log(this.props.mainuser);
      this.props.commentEvent(this.props.keyy, this.props.mainuser, this.refs.commentinput.value); 
      this.refs.commentinput.value = '';
    }
    
    saveEditEvent=(data)=>{
      // console.log(this.props.keyy,data);
      this.props.editEvent(this.props.keyy, data);
      
    }
   
    closeEditModal=()=>{
      this.setState({isopeneditmodal:false});
    }
  
    openEditModal=()=>{
      // console.log(this.state.isopeneditmodal);
      this.setState({isopeneditmodal:true});
    }
    
    closeProfileModal=()=>{
      this.setState({isopenprofilemodal:false});
    }
  
    openProfileModal=()=>{
      this.setState({isopenprofilemodal:true});
    }
    
    closeLikeModal=()=>{
      this.setState({isopenlikemodal:false});
    }
  
    openLikeModal=()=>{
      this.setState({isopenlikemodal:true});
    }
  
    closeCommentModal=()=>{
      this.setState({isopencommentmodal:false});
    }
  
    openCommentModal=()=>{
      this.setState({isopencommentmodal:true});
    }
  
    
  
    render(){
        let totalcomments = 0;
        let mainiconpimg = <p  className="mainiconpimg" ></p>;   
        let totallikes = 0;
        let react3img = null;
        let commentsarr = [];
        let likesarr = [];
        let sortedcommentskeys = [];
        if(this.props.item.likes!== undefined){
          totallikes= Object.keys(this.props.item.likes).length;                                  
        }

        if(this.props.item.comments!== undefined){
          totalcomments= Object.keys(this.props.item.comments).length;                                
        }  

        if(this.props.item.comments!== undefined){
          sortedcommentskeys= Object.keys(this.props.item.comments);
          // console.log(sortedcommentskeys);
           sortedcommentskeys.sort((a, b)=> {
              return new Date(a).getTime() - new Date(b).getTime()
            });
          // console.log(sortedcommentskeys);
          sortedcommentskeys.map((keyy)=>{
            // console.log(keyy, this.props.item.comments[keyy]);
            Object.keys(this.props.item.comments[keyy]).map((key, index)=>{
           commentsarr.unshift(<div key={keyy} className="comment">
                                  <img  className="commentimg" src={this.props.users[key].userpic} />
                                  <span className="commentname">{this.props.users[key].username} </span>
                                  <span className="commentpara">{this.props.item.comments[keyy][key]}</span>
                                  <div className="commentdatetimediv">
                                    <span className="commentdatetime">{ new Date(keyy).toDateString() +', '+ new Date(keyy).toLocaleTimeString() }</span>
                                    {/* toDateString() toLocaleTimeString() */}
                                  </div>
                                </div>)       
             }
            ) 
          
          }
          );
        }

         react3img=[{count:0,reaction:'love'},
                    {count:0,reaction:'like'},
                    {count:0,reaction:'haha'},
                    {count:0,reaction:'wow'},
                    {count:0,reaction:'angry'},
                    {count:0,reaction:'sad'}];
      if(this.props.item.likes !== undefined){
        Object.keys(this.props.item.likes).map((keyy, index)=>{
          // console.log(this.props.item.likes[keyy][Object.keys(this.props.item.likes[keyy])[0]]);                    
          (this.props.item.likes[keyy][Object.keys(this.props.item.likes[keyy])[0]] === 'love')?react3img[0].count= react3img[0].count + 1:
          (this.props.item.likes[keyy][Object.keys(this.props.item.likes[keyy])[0]] === 'like')?react3img[1].count= react3img[1].count + 1:
          (this.props.item.likes[keyy][Object.keys(this.props.item.likes[keyy])[0]] === 'haha')?react3img[2].count= react3img[2].count + 1:
          (this.props.item.likes[keyy][Object.keys(this.props.item.likes[keyy])[0]] === 'wow')?react3img[3].count= react3img[3].count + 1:
          (this.props.item.likes[keyy][Object.keys(this.props.item.likes[keyy])[0]] === 'angry')?react3img[4].count= react3img[4].count + 1:
          (this.props.item.likes[keyy][Object.keys(this.props.item.likes[keyy])[0]] === 'sad')?react3img[5].count= react3img[5].count + 1:null
          // console.log(react3img); 
        })         
          react3img.sort((a, b)=>{
            return a.count < b.count;
          });
          // console.log(react3img);
        mainiconpimg = <p className="mainiconpimg">
                        {react3img[0].count!=0?<img className="mainiconl " src={require("../images/"+react3img[0].reaction+".png")} alt="" />:null}
                        {react3img[1].count!=0?<img className="mainiconl " src={require("../images/"+react3img[1].reaction+".png")} alt="" />:null}
                        {react3img[2].count!=0?<img className="mainiconl " src={require("../images/"+react3img[2].reaction+".png")} alt="" />:null}
                      </p>
        }
  
        return (
        <div ref='itemone'>
          
          { this.state.isopeneditmodal ? <EditEventModal 
                  saveEditEvent={this.saveEditEvent}
                  closeEditModal={this.closeEditModal}
                  eventdate={this.props.item.postdata.eventdate}
                  eventname={this.props.item.postdata.eventname}
                  eventdecs={this.props.item.postdata.eventdecs}
          /> : null }
  
         
         { this.state.isopenprofilemodal ? <ProfileModal 
                  closeProfileModal={this.closeProfileModal}
                  users={this.props.users} item={this.props.item}
                  /> : null }
  
         { this.state.isopenlikemodal ? <LikeModal 
                  closeLikeModal={this.closeLikeModal}
                  users={this.props.users} mainuser={this.props.mainuser}
                  item={this.props.item}
          /> : null }
  
         { this.state.isopencommentmodal ? <CommentModal 
                  closeCommentModal={this.closeCommentModal}
                  sortedcommentskeys={sortedcommentskeys}
                  item ={this.props.item} users={this.props.users}
                  mainuser={this.props.mainuser}
          /> : null }
  
          <div key={this.props.keyy} className="p-2 mr-5 ml-5 mb-5 eventitem">
              <h1  className="h-2 text-center  eventname">{this.props.item.postdata.eventname}</h1>
              <div className="d-flex justify-content-between">
                <div onClick={this.openProfileModal} className="lead ml-3 eventauthdate hove"><img src={this.props.users[this.props.item.creater].userpic} className="unameimage" />{this.props.users[this.props.item.creater].username}</div>
                <div className="lead mr-5 eventauthdate">{this.props.item.postdata.eventdate}</div>
              </div>
              <hr />
              <p className="eventdes ml-3" id="pp">{this.props.item.postdata.eventdecs}</p>
              <hr />      
              <div className="n row">
                  <div className="mainicondiv col-auto mr-auto">
                       <p onClick={this.openLikeModal} className="mainiconp" >
                       
                       {totallikes} Likes </p>
                        {mainiconpimg}
                         <div id='pbtn'>  
                         
                        <img ref='mainicon'  onClick={this.props.itemtype==='reaction' ? null : ()=>{this.mainIconClick()} } className="mainicon " 
                          src={this.props.item.likes === undefined || this.props.item.likes[this.props.mainuser] === undefined ?
                           require("../images/mainicon.png") : require("../images/"+Object.keys(this.props.item.likes[this.props.mainuser]).map((key)=>this.props.item.likes[this.props.mainuser][key])+".png")} alt="" />
                        <div ref='popover' id="popover">
                          <div><img ref='love'  name='love' onClick={(e)=>{this.reactionClick(e)}} src={require("../images/love.png")}  id="p1" alt=''  /></div>
                          <div><img ref='haha' name='haha'  onClick={(e)=>{this.reactionClick(e)}} src={require("../images/haha.png")}  id="p2" alt='' /></div>
                          <div><img ref='wow' name='wow'  onClick={(e)=>{this.reactionClick(e)}} src={require("../images/wow.png")}   id="p3" alt=''/></div>
                          <div><img ref='like' name='like'  onClick={(e)=>{this.reactionClick(e)}} src={require("../images/like.png")}  id="p4"  alt=''/></div>
                          <div><img ref='angry' name='angry'  onClick={(e)=>{this.reactionClick(e)}} src={require("../images/angry.png")} id="p5" alt=''/></div>
                          <div><img ref='sad' name='sad'  onClick={(e)=>{this.reactionClick(e)}} src={require("../images/sad.png")} id="p6" alt=''/></div>
                          <div><img ref='middleMainIconClick'   onClick={(e)=>{this.middleMainIcon(e)}} src={require("../images/mainicon.png")}  id="pmain" alt=''/></div>
                        </div>
                        <img  className="multipleimage multiple1 " src={require("../images/love.png")} alt="" />                
                        <img  className="multipleimage multiple2 " src={require("../images/love.png")} alt="" />                
                        <img  className="multipleimage multiple3 " src={require("../images/love.png")} alt="" />                
                        <img  className="multipleimage multiple4 " src={require("../images/love.png")} alt="" />                
                        <img  className="multipleimage multiple5 " src={require("../images/love.png")} alt="" />                
                        <img  className="multipleimage multiple6 " src={require("../images/love.png")} alt="" />                
                        <img  className="multipleimage multiple7 " src={require("../images/love.png")} alt="" />                
                        <img  className="multipleimage multiple8 " src={require("../images/love.png")} alt="" />                
                      </div>
                        
                       <p onClick={this.openCommentModal} className="mainiconcommentp">{totalcomments} comments</p>
                  </div>
                  {
                      this.props.itemtype === 'myevents'?
                    <div className="btndiv col-auto">
                      <button onClick={()=>this.openEditModal()} ref='bt' className="btn btn-warning mr-md-5 mr-sm-3 " data-toggle="modal"  data-target='.modal'  >Edit</button>
                      <button onClick={()=>{this.props.deleteEvent(this.props.keyy)}}  className="btn btn-danger mr-md-5 mr-sm-3"  id="'+uid+'" >Delete</button>
                    </div>
                    :this.props.itemtype === 'goingevents'?
                    <div className="btndiv col-auto">
                    <button onClick={()=>{this.props.deleteEventFromGoing(this.props.mainuser, this.props.onlyforgoing)}}  className="btn btn-danger mr-md-5 mr-sm-3"   >Remove</button>
                    </div>
                    :this.props.itemtype === 'allevents'?
                    <div className="btndiv col-auto">
                    <button onClick={()=>{this.props.addEventToGoing(this.props.mainuser, this.props.keyy)}}  className="btn btn-success mr-md-5 mr-sm-3"   >Going</button>
                    </div>
                    :null
                  }
                </div>

                {this.props.itemtype !== 'reaction' ? <div className="seprate"></div> : <br />  }
                
                {
                  this.props.itemtype==='reaction'?null:
                  <div className="comment">
                    <input ref='commentinput' className="commentbox " placeholder="Type Comment..." type="text" name="" id="" />
                    <input className="commentbtn" onClick={()=>{this.commentEvent()}} type="submit" value="Post" name="" id="" />
                  </div>
                }

                <div>
                  {commentsarr[0]}
                  {commentsarr[1]}
                  {commentsarr[2]}
                  {commentsarr[3]}
                </div>
                  {totalcomments > 3 ? <button onClick={()=>{this.openCommentModal()}} className="seemorebtn">See more >>></button> : null}
              </div>
        </div>
        )}
  }
  