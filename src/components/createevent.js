import React, { Component } from 'react';
import  '../components/stylesheet.css';
import  '../components/bootstrap.css';

export default class CreateEventModal extends Component{
    closeModal(){
        setTimeout(()=>{this.refs.profilemodal.style.opacity= 0;} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(-300px)';} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(0px)';
                        this.props.iscreateevent()} ,300);  

                    }
    openModal(){
        setTimeout(()=>{
            setTimeout(()=>{this.refs.profilemodal.style.opacity= 1;} ,0);    
            this.refs.profilemodal.style.display = 'block';
        },300);
    }

    createEventFun=()=>{
        if(this.refs.eventname.value !== '' && this.refs.eventdate.value !== '' && this.refs.eventdecs.value !== ''){
        this.closeModal();
        // console.log(this.refs.eventname.value,this.refs.eventdate.value,this.refs.eventdecs.value);
        let data = {
            postdata:{
                eventname:this.refs.eventname.value,
                eventdate:this.refs.eventdate.value,
                eventdecs:this.refs.eventdecs.value
            },
            creater:this.props.mainuser
        }
        setTimeout(() => {
            this.props.addEvent(data);
        }, 400);
    }
    else{
        this.refs.err.style.display = 'block';
    }
}

    render(){
        this.openModal();
        return(
            <div className=''>
                <div className="modal f text-center  madal-back"  ref="profilemodal">
                    <div className="modal-dialog " role="document">
                        <div ref='fb' className=" fb rounded-circle modalcustom ">
                        <div className="modal-body p-5 ">
                            <h1 className="modalh1" id="exampleModalLabel">Creat Event</h1>
                            <form className="mr-5 ml-5">
                                <div className="form-group">
                                    <input ref='eventname' type="text" className="modalinput" placeholder="Event Name" />
                                </div>
                                <div className="form-group">
                                    <input ref='eventdate' type="date" className="modalinput" />
                                </div>
                                <div className="form-group">
                                    <textarea ref='eventdecs' className="modalinput" rows="5" placeholder="Event Description" ></textarea>
                                </div>
                            </form>
                            <button onClick={()=>this.closeModal()} type="button" className="btn modalbtn" >Close</button>
                            <button onClick={()=>this.createEventFun()} type="button" className="btn modalbtn"  >Save</button>
                            <div ref='err' className="editmerrorpclass ">Please fill all fields</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}