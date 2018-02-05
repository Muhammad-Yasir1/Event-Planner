import React, { Component } from 'react';
import  '../components/stylesheet.css';
import  '../components/bootstrap.css';

export default class ProfileModal extends Component{
    closeModal=()=>{
        setTimeout(()=>{this.refs.profilemodal.style.opacity= 0;} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(-300px)';} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(0px)';
                        // this.refs.profilemodal.style.display = 'none';
                        this.props.closeProfileModal()} ,300);  
            }

    openModal=()=>{
        setTimeout(()=>{
            setTimeout(()=>{this.refs.profilemodal.style.opacity= 1;} ,0);    
            this.refs.profilemodal.style.display = 'block';
        },200);
    }

    render(){
        this.openModal();

        

        return(
            
            <div className="modal f text-center  madal-back"  ref="profilemodal">
                    <div className="modal-dialog " role="document">
                        <div ref='fb' className=" fb rounded-circle modalcustom ">
                        <div className="modal-body p-5 ">
                                <h1 className="modalh1">PROFILE</h1>
                                <img className="modaluserimage" src={this.props.users[this.props.item.creater].userpic} alt="" />
                                <h3 className="modalusername">{this.props.users[this.props.item.creater].username}</h3>
                                <br/><h4 className="modaluserabout">About</h4>
                                <p className="modaluseraboutpara">{this.props.users[this.props.item.creater].userabout}</p>
                                <button onClick={this.closeModal} type="button" className="btn modalbtn" data-dismiss="modal" id="editmodelclosebtn">Close</button>
                                </div>
                            </div>
                            </div>
                        </div>


        );
    }
}