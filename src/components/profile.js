import React, { Component } from 'react';
import {BrowserRouter as Router,
    Route,
    Link,
  } from 'react-router-dom';
  import  './stylesheet.css';
  import  './bootstrap.css';
import Item from "./item.js";
class Reaction extends Component{
    
    render(){
        let isposts = false;
        let noposts= <div className="m-5 eventitem dafault">
                        <h1 className="display-1 text-center noevent  eventname">No Events</h1>
                     </div>
        let posts = [];
              if(this.props.posts !== undefined ){
                //   console.log(this.props.reactiontosee);
                Object.keys(this.props.posts).map((key,index)=> {
                    if(this.props.posts[key].likes !== undefined){  
                        Object.keys(this.props.posts[key].likes).map((uid)=>{
                            // console.log(uid);
                            // console.log(this.props.mainuser, this.props.posts[key].likes[uid][Object.keys(this.props.posts[key].likes[uid])[0]] );
                        if(uid === this.props.mainuser && this.props.posts[key].likes[uid][Object.keys(this.props.posts[key].likes[uid])[0]] === this.props.reactiontosee){
                            // console.log(this.props.posts[key]);
                            isposts = true;
                            posts.push(<Item itemtype='reaction'  key={key} keyy={key} 
                                 index={index} item={this.props.posts[key]} 
                                 users={this.props.users} mainuser={this.props.mainuser}
                                 posts={this.props.posts}
                               />)
                        }
                    });
                }
                  })
                }
        return(
            <div>
                {isposts ? posts : noposts}
            </div>
        )
    }
}


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            nameedit:false,
            aboutedit:false,
        }
    }
    setEditUserName=()=>{
        // console.log(this.refs.uname.innerText);
        this.setState({nameedit:!this.state.nameedit});
    }
    editUserName=(e)=>{
        // console.log(this.refs.editedvalue.value.length);
        if(this.refs.editedvalue.value.length > 24 || this.refs.editedvalue.value.length < 3){
            this.errorname();
        }
        else{
            this.refs.errname.style.display = 'none';        
            this.setState({nameedit:!this.state.nameedit});
            this.props.editUserName(this.props.mainuser, this.refs.editedvalue.value);
        }
    }

    setEditUserAbout=()=>{
        this.setState({aboutedit:!this.state.aboutedit});
        // console.log(this.state.aboutedit);
    }

    editUserAbout=()=>{
        // console.log(this.refs.aboutval.value.length);
        if(this.refs.aboutval.value === '' || this.refs.aboutval.value === ' ' || this.refs.aboutval.value.length > 300){
            this.errorabout();
        }
        else{
            this.refs.errabout.style.display = 'none';        
            this.setState({aboutedit:!this.state.aboutedit});
            // console.log(this.props.mainuser, this.refs.aboutval.value);
            this.props.editUserAbout(this.props.mainuser, this.refs.aboutval.value);
        } 
    }
    errorname = ()=>{
        this.refs.errname.style.display = 'block';
        setTimeout(()=>{
            if(this.refs.errname.style.display = 'block'){
                this.refs.errname.style.display = 'none';
            }
        },5000);
    }

    errorabout = ()=>{
        this.refs.errabout.style.display = 'block';        
        setTimeout(()=>{
            if(this.refs.errabout.style.display = 'block'){
                this.refs.errabout.style.display = 'none';
            }
        },5000);
    }
    _handleImageChange=(e)=> {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if(e.target.files[0].type.search('image/') !== -1){
            // console.log(e.target.files[0].type.search('image/'));
            reader.onloadend = () => {
                this.props.editUserPic(this.props.mainuser,reader.result );
            }
            reader.readAsDataURL(file)
            this.refs.errimg.style.display = 'none';
            setTimeout(()=>{
                if(this.refs.errimg.style.display = 'block'){
                    this.refs.errimg.style.display = 'none';
                }
            },5000);
          }
        else{
            console.log(e.target.files[0].type.search('image/'));                
            this.refs.errimg.style.display = 'block';
          }
    }
    
    render(){
        // console.log(this.props.users);
        // console.log(this.props.mainuser);
        // console.log(this.props.users[this.props.mainuser]);
        // console.log(this.props.users[this.props.mainuser].username);
        return(
    <Router>   
        <div>   
                 <h1 className='jumbo-bg-col p-3 text-center display-3 mb-5 mt-1'>Profile</h1> 
                <div className=' userimgdiv'>
                    <div className='imgd'>
                        <img className='userimage' src={this.props.users[this.props.mainuser].userpic} alt=""/>
                        <label htmlFor="file-upload">
                            <div className='editnameplus'><span className='pluscha'>+</span></div>
                        </label>
                        <input onChange={(e)=>this._handleImageChange(e)} id="file-upload" type="file"/>
                    </div>
                    {
                        this.state.nameedit?
                        <div><input defaultValue={this.props.users[this.props.mainuser].username} ref='editedvalue' className=' editname  text-danger' type="text" /><input className='btn btn-success ml-3 mr-md-5 mr-sm-3 ' type="button" onClick={this.editUserName} value='Save' /></div>  :
                        <h1 ref='uname' onClick={this.setEditUserName}  className='usernamenamediv'>{
                            this.props.users[this.props.mainuser].username
                            }
                        <div className='editnameplus'><span className='pluscha'>+</span></div></h1>
                    }
                    <hr/>
                    {this.state.aboutedit?
                        <div><textarea ref='aboutval' className='editabout p-1 text-danger ' name=""  rows="5" defaultValue={this.props.users[this.props.mainuser].userabout}></textarea>
                        <input onClick={this.editUserAbout} className='btn cusbtn btn-success ml-3 mr-md-5 mr-sm-3  ' type="button" value='save'  />
                        </div>:
                        <div ref='uabout' onClick={this.setEditUserAbout}   className=' usernameaboutdiv'>
                            {
                                this.props.users[this.props.mainuser].userabout
                            }
                            <div className='editaboutplus'><span className='editpluscha'>+</span></div>
                        </div>
                    }
                    <p ref='errname' className='editmerrorpclass'>Name must in between 3 to 24 charector and should start with alphabet.</p>
                    <p ref='errabout'  className='editmerrorpclass'>About must 300 charector.</p>
                    <p ref='errimg'   className='editmerrorpclass'>Please choese a image.</p>
                    
                </div>
                <br/>
                <nav className="nav nav-pills nav-justified reactionnav">
                    <Link className='nav-item nav-link activecustomlove'  to='/profile/love' ><img className='reactionicon' src={require('../images/love.png')} alt="" /></Link><br/>
                    <Link className='nav-item nav-link activecustomhaha'  to='/profile/haha'><img className='reactionicon' src={require('../images/haha.png')} alt="" /></Link><br/>
                    <Link className='nav-item nav-link activecustomlike'  to='/profile/like'><img className='reactionicon' src={require('../images/like.png')} alt="" /></Link><br/>
                    <Link className='nav-item nav-link activecustomwow'   to='/profile/wow'><img className='reactionicon' src={require('../images/wow.png')} alt="" /></Link><br/>
                    <Link className='nav-item nav-link activecustomangry' to='/profile/angry'><img  className='reactionicon' src={require('../images/angry.png')} alt="" /></Link><br/>
                    <Link className='nav-item nav-link activecustomsad'   to='/profile/sad'><img className='reactionicon' src={require('../images/sad.png')} alt="" /></Link><br/>
                </nav>      
                <br/>
                <Route exact path='/profile/love'  render={()=> <Reaction users={this.props.users} posts={this.props.posts} mainuser={this.props.mainuser} reactiontosee={'love'}   /> } />
                <Route exact path='/profile/like'  render={()=> <Reaction users={this.props.users} posts={this.props.posts} mainuser={this.props.mainuser} reactiontosee={'like'}   /> } />
                <Route exact path='/profile/haha'  render={()=> <Reaction users={this.props.users} posts={this.props.posts} mainuser={this.props.mainuser} reactiontosee={'haha'}   /> } />
                <Route exact path='/profile/angry' render={()=> <Reaction users={this.props.users} posts={this.props.posts} mainuser={this.props.mainuser} reactiontosee={'angry'}  /> } />
                <Route exact path='/profile/wow'   render={()=> <Reaction users={this.props.users} posts={this.props.posts} mainuser={this.props.mainuser} reactiontosee={'wow'}    /> } />
                <Route exact path='/profile/sad'   render={()=> <Reaction users={this.props.users} posts={this.props.posts} mainuser={this.props.mainuser} reactiontosee={'sad'}    /> } />
            
        </div>
    </Router> 
         )
    }
}

export default Profile;
