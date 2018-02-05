import React, { Component } from 'react';
import EventAction from "../store/action/eventaction";
class LoginSignup extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    signin=()=>{
        // console.log(this.refs.uemail.value, this.refs.upassword.value);        
        this.props.signIn(this.refs.uemail.value, this.refs.upassword.value, this.props.getPosts);
    }
    
    signup=()=>{
        // console.log('signup');
        this.props.signUp(this.refs.uemail.value, this.refs.upassword.value);
    }

    render(){
        return(
        <div className='maindivouter'>  
            
    <div className="d-inline-block bg-danger p-3 w-100 mainnav">
        <div className="navbar-brand " >
            <img src={require("../images/Eventicontabnew.png")}  className="d-inline-block ml-5 mr-4 toptopimg" />
            <div className="h2 align-middle d-inline-block cust-gray">
                <img className='topeventimg' src={require('../images/nameback.png')} alt="" />
                <h1 className='topeventname'>Event Planer</h1>
            </div>
        </div>
    </div>


<div className="container-fluid  inpmaindiv">
  <div className="row ">
    <div className="col-md-6 text-center imgdiv">
      <img src={require("../images/fonticon.png")} className="img-fluid w-75 p-5 anima" alt="" />
    </div>
    <div className="col-md-6  my-auto inputdiv" >
        <div className=" mr-5 ml-5 mt-0 mb-0">
            {
                  this.props.signerror.state ? (
                  (this.props.signerror.type === 'signinerror') ? <p className="errorpclass">Please Write Correct Email and Password </p> :
                  (this.props.signerror.type === 'signuperror') ? <p className="errorpclass"> Email Taken by another account and Password should contain at least 6 characters</p> : null  )
                   : null
              }
              <div className="nameinp">
                <input ref='uemail' type='email' className=" sinp p-3 font-weight-bold text-danger w-100"  placeholder="Email" />
              </div>
              
              <div className="nameinp">
                <input ref='upassword' type='password' className="sinp p-3 font-weight-bold text-danger w-100"  placeholder="Password" />
              </div>
              
           <div className='btndivlogin'>
                <button onClick={this.signup} type="button" className="btn sbtn font-weight-bold " >Sign Up</button>
                <button onClick={this.signin} type="button" className="btn sbtn font-weight-bold" >Sign In</button> 
                {/* <img className='facebookicon' onClick={this.props.signupwithfacebook} src={require("../images/facebookicon.png")} alt=""/>     
                <img className='googleicon' src={require("../images/googleicon.png")} alt=""/>      */}
              </div>
        </div>
    </div>
  </div>
</div>
        </div>  
        )
    }
}
export default LoginSignup;
