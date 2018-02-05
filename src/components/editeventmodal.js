import React, { Component } from 'react';
import  '../components/stylesheet.css';
import  '../components/bootstrap.css';

export default class EditEventModal extends Component{
    closeEditModal(){
        setTimeout(()=>{this.refs.profilemodal.style.opacity= 0;} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(-300px)';} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(0px)';
                        this.props.closeEditModal()} ,300);  

                    }
    openModal(){
        setTimeout(()=>{
            setTimeout(()=>{this.refs.profilemodal.style.opacity= 1;} ,0);    
            this.refs.profilemodal.style.display = 'block';
        },200);
    }

    saveEditModal=()=>{
        // console.log(this.refs.eventname.value,this.refs.eventdate.value,this.refs.eventdecs.value);
        if(this.refs.eventname.value !== '' && this.refs.eventdate.value !== '' && this.refs.eventdecs.value !== ''){
        let postdata = {
                eventname:this.refs.eventname.value,
                eventdate:this.refs.eventdate.value,
                eventdecs:this.refs.eventdecs.value
            }
        this.props.saveEditEvent(postdata);
        setTimeout(() => {
            this.closeEditModal();
        }, 400);
    }
        else{
        this.refs.err.style.display = 'block';
    }
}

    render(){
        this.openModal();
        return(
            <div>
                <div className="modal f text-center  madal-back"  ref="profilemodal">
                    <div className="modal-dialog " role="document">
                        <div ref='fb' className=" fb rounded-circle modalcustom ">
                        <div className="modal-body p-5 ">
                            <h1 className="modalh1" id="exampleModalLabel">Edit Event</h1>
                            <form className="mr-5 ml-5">
                                <div className="form-group">
                                    <input ref='eventname' defaultValue={this.props.eventname} type="text" className="modalinput" placeholder="Event Name" />
                                </div>
                                <div className="form-group">
                                    <input ref='eventdate' defaultValue={this.props.eventdate} type="date" className="modalinput" />
                                </div>
                                <div className="form-group">
                                    <textarea ref='eventdecs'  defaultValue={this.props.eventdecs} className="modalinput" rows="5" placeholder="Event Description" ></textarea>
                                </div>
                            </form>
                            <button onClick={()=>this.closeEditModal()} type="button" className="btn modalbtn" >Close</button>
                            <button onClick={()=>this.saveEditModal()} type="button" className="btn modalbtn"  >Save</button>
                            <div ref='err' className="editmerrorpclass ">Please fill all fields</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}