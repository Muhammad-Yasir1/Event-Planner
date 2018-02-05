import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router,
    Route,
    Link,
    NavLink,
    Redirect,
  } from 'react-router-dom';
  import { connect } from 'react-redux'  
  import './app.css'
  import  EventAction  from "../store/action/eventaction";
  import  MyEvents  from "../components/myevents";
  import  AllEvents  from "../components/allevents.js";
  import  GoingEvents  from "../components/goingevents.js";
  import  Profile  from "../components/profile.js";
  import  LoginSignup  from "../components/loginsignup.js";
  import  CreateEventModal  from "../components/createevent";
  import customHistory from "../store/history/history";
function mapStateToProps(state) {
    // console.log(state);
    return {
        posts:state.EventReducer.posts,
        users:state.UserReducer.users,
        mainuser:state.AuthReducer.mainuser,
        signerror: state.AuthReducer.mainuser.signerror,
        loaderstate: state.AuthReducer.mainuser.loader
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: (uid) => dispatch(EventAction.getPosts()),
        addEvent: (data) => dispatch(EventAction.addEvent(data)),
        editEvent: (key, data) => dispatch(EventAction.editEvent(key, data)),
        deleteEvent: (key) => dispatch(EventAction.deleteEvent(key)),
        commentEvent: (key, uid, comment) => dispatch(EventAction.commentEvent(key, uid, comment)),
        likeEvent: (key, uid, reaction) => dispatch(EventAction.likeEvent(key, uid, reaction)),
        unlikeEvent: (key, uid) => dispatch(EventAction.unlikeEvent(key, uid)),
        logout: ()=>dispatch({type:EventAction.Logout}),
        signIn: (email, password, getPosts) => dispatch(EventAction.signIn(email, password, getPosts)),
        signUp: (email, password) => dispatch(EventAction.signUp(email, password)),
        signupwithfacebook: () => dispatch({type:'Sign_Up_With_Facebook'}),

        addEventToGoing: (uid, key) => dispatch(EventAction.addEventToGoing(uid, key)),
        deleteEventFromGoing: (uid, key) => dispatch(EventAction.deleteEventFromGoing(uid, key)),
        unknownevent: (uid, key) => dispatch(EventAction.unknownevent(uid, key)),
        editUserName: (uid, editedname) => dispatch(EventAction.editUserName(uid, editedname)),
        editUserPic: (uid, Pic) => dispatch(EventAction.editUserPic(uid, Pic)),
        editUserAbout: (uid, editedabout) => dispatch(EventAction.editUserAbout(uid, editedabout)),
    };
}

class Loader extends Component{
    render(){
    return <div>
            <div className="d-inline-block bg-danger p-3 w-100 mainnav">
                <div className="navbar-brand " >
                    <img src={require("../images/Eventicontabnew.png")}  className="d-inline-block ml-5 mr-4 toptopimg" />
                    <div className="h2 align-middle d-inline-block cust-gray">
                        <img className='topeventimg' src={require('../images/nameback.png')} alt="" />
                        <h1 className='topeventname'>Event Planer</h1>
                    </div>
                </div>
            </div>
            <div className="loader">
                    <img className="Eventicon" src={require("../images/Eventicontabnew.png")} />
                </div>
            </div> 
    }
}
class App extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            iscreateevent:false
        }

    }
    iscreateevent= ()=>{
        this.setState({iscreateevent:!this.state.iscreateevent})
    }

    logout= ()=>{

    }
    render(){
            // console.log(this.props.mainuser.loginstate);

return (
    <div>

        <Router history={customHistory}>
        {this.props.loaderstate ? <Loader />:
            <div>
                {this.props.mainuser.loginstate?<div>
                            {/* {console.log('di')} */}


                    {this.state.iscreateevent?
                        <CreateEventModal mainuser={this.props.mainuser.mainuserid} iscreateevent={this.iscreateevent} addEvent={this.props.addEvent} />:
                        null
                    }
<div className='mainnav bg-danger mainnavpro'>
        <img className="d-inline-block ml-5 mr-4 toptopimg" src={require('../images/Eventicontabnew.png')} alt="" />
        <NavLink className='di wcs llink' style={{ textDecoration: 'none' }} to='/'>My Events</NavLink>
        <NavLink className='di wcs llink'  style={{ textDecoration: 'none' }} to='/allevents'>All Events</NavLink>
        <NavLink className='di wcs llink' style={{ textDecoration: 'none' }} to='/goingevents'>Going Events</NavLink>
        <div   className='di wcs llink' onClick={()=>this.iscreateevent()}>Create Event</div>
        <NavLink className=' di wcs llink ' style={{ textDecoration: 'none' }} to='/profile/love'>Profile</NavLink>
        <div className='ltwo'>
            <div className='nn di wcs  llink l2' onClick={()=>this.props.logout()}>LogOut</div>               
        </div>
</div>                
                    
                    <Route exact path='/' render={()=> <MyEvents
                     mainuser={this.props.mainuser.mainuserid} 
                     posts={this.props.posts}
                     users={this.props.users}
                     editEvent={this.props.editEvent}
                     deleteEvent={this.props.deleteEvent}
                     commentEvent={this.props.commentEvent}
                     likeEvent={this.props.likeEvent}
                     unlikeEvent={this.props.unlikeEvent}
                       /> } />

                    <Route path='/allevents' render={()=> <AllEvents
                     mainuser={this.props.mainuser.mainuserid} 
                     posts={this.props.posts} 
                     users={this.props.users}
                     commentEvent={this.props.commentEvent}
                     likeEvent={this.props.likeEvent}
                     unlikeEvent={this.props.unlikeEvent}
                     addEventToGoing={this.props.addEventToGoing}
                      /> } />
                    
                    <Route path='/goingevents' render={()=> <GoingEvents
                     mainuser={this.props.mainuser.mainuserid}
                     posts={this.props.posts} 
                     users={this.props.users}
                     commentEvent={this.props.commentEvent}
                     likeEvent={this.props.likeEvent}
                     unlikeEvent={this.props.unlikeEvent}
                     deleteEventFromGoing={this.props.deleteEventFromGoing} 
                     unknownevent={this.props.unknownevent}
                     /> } />

                    <Route path='/profile' render={()=> <Profile
                     mainuser={this.props.mainuser.mainuserid}
                     editUserName = {this.props.editUserName}
                     editUserPic = {this.props.editUserPic}
                     editUserAbout = {this.props.editUserAbout}
                     posts={this.props.posts}
                     users={this.props.users}
                     /> } />

                        

              </div>:
              <div>
                {/* {customHistory.push('/')} */}
                {/* <Redirect to='/' />     */}
                <Route exact path='/' render={()=><LoginSignup
                    signIn={this.props.signIn}
                    signUp={this.props.signUp}
                    getPosts={this.props.getPosts}
                    signerror={this.props.signerror}
                    signupwithfacebook={this.props.signupwithfacebook}
                />} />
                
              </div>
            }
            </div>
            }

          </Router>
          <div className="fixed-bottom bg-danger foot forposts">
            <div className="d-inline-block ml-5 forposts text-secondary">Copyright © 2018. All rights reserved</div> 
            <p className="d-inline-block forposts float-right mr-5 ">muhammadyasir11000@gmail.com</p>
        </div>  

          </div>        
    );
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

  