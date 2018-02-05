import React, { Component } from 'react';
import  '../components/stylesheet.css';
import  '../components/bootstrap.css';

export default class LikeModal extends Component{
    closeModal=()=>{
        setTimeout(()=>{this.refs.likemodal.style.opacity= 0;} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(-300px)';} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(0px)';
                        this.props.closeLikeModal()} ,300);  
            }

    openModal=()=>{
        setTimeout(()=>{
            setTimeout(()=>{this.refs.likemodal.style.opacity= 1;} ,0);    
            this.refs.likemodal.style.display = 'block';
        },200);
    }

    render(){
        this.openModal();

        let alllikes = [];
        let arr =[];
        if(this.props.item.likes!= undefined){
            Object.keys(this.props.item.likes).map((key)=>{
                // console.log(key);
                let obj = {};
                obj[key] = this.props.item.likes[key];
                arr.push(obj);
            });
            // console.log(arr);
          arr.sort((a, b)=> new Date(Object.keys(a[Object.keys(a)[0]])[0]) - new Date(Object.keys(b[Object.keys(b)[0]]))).map((val, index)=>{
            // console.log(Object.keys(Object.values(val)[0])[0]);
            alllikes.unshift(
                <div key={index} className="modallikelikediv">
                    <img  className=" modallikelikeimg" src={this.props.users[Object.keys(val)[0]].userpic} />
                    <span className=" modallikelikename">{this.props.users[Object.keys(val)[0]].username}</span>
                    <img  className=" modallikelikereaction" src={require("../images/"+val[(Object.keys(val)[0])][Object.keys(val[(Object.keys(val)[0])])]+".png")} />
                    <div className="commentdatetimediv">
                      <span className="commentdatetime">{ new Date(Object.keys(Object.values(val)[0])[0]).toDateString() +', '+ new Date(Object.keys(Object.values(val)[0])[0]).toLocaleTimeString() }</span>
                    </div>
                </div>
              ); 
          })
        }

        return(
            
            <div className="modal f text-center  madal-back"  ref="likemodal">
                    <div className="modal-dialog " role="document">
                        <div ref='fb' className=" fb rounded-circle modalcustom ">
                        <div className="modal-body p-5 ">
                        <h3 className="modalh1">LIKES</h3>
                        <h4 className="modallikeeventname">{this.props.item.postdata.eventname} </h4>
                        <div className="modallikelike">
                            {alllikes}
                            
                        </div>          
                        <br />
                        <button type="button" className="btn modalbtn" onClick={this.closeModal}>Close</button>
                      </div>
                   </div>
                            </div>
                        </div>
  

        );
    }
}