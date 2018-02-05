import React, { Component } from 'react';
import  '../components/stylesheet.css';
import  '../components/bootstrap.css';

export default class CommentModal extends Component{
    closeModal=()=>{
        setTimeout(()=>{this.refs.likemodal.style.opacity= 0;} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(-300px)';} ,0);   
        setTimeout(()=>{this.refs.fb.style.transform = 'translateY(0px)';
                        this.props.closeCommentModal()} ,300);  
            }

    openModal=()=>{
        setTimeout(()=>{
            setTimeout(()=>{this.refs.likemodal.style.opacity= 1;} ,0);    
            this.refs.likemodal.style.display = 'block';
        },200);
    }

    render(){
        this.openModal();
        let allcomments = [];
        this.props.sortedcommentskeys.map((val, index)=>{
            // console.log(this.props.item.comments[val]);
            // console.log(Object.keys(this.props.item.comments[val])[0]);
            // console.log(this.props.item.comments[val][Object.keys(this.props.item.comments[val])]);
        allcomments.unshift(<div key={index} className="modalcommentcommentdiv">
                <img  className=" modalcommentcommentimg" src={this.props.users[Object.keys(this.props.item.comments[val])[0]].userpic} />
                <span className=" modalcommentcommentname">{this.props.users[Object.keys(this.props.item.comments[val])[0]].username}</span>
                <span className="modalcommentcommentpara">{this.props.item.comments[val][Object.keys(this.props.item.comments[val])]}</span>
                <div className="commentdatetimediv">
                      <span className="commentdatetime">{ new Date(val).toDateString() +', '+ new Date(val).toLocaleTimeString() }</span>
                </div>
            </div>)
        });

        return(
            
            <div className="modal f text-center  madal-back"  ref="likemodal">
                    <div className="modal-dialog " role="document">
                        <div ref='fb' className=" fb rounded-circle modalcustom ">
                        <div className="modal-body p-5 ">
                        <h3 className="modalh1">COMMENTS</h3>
                        <h4 className="modalcommenteventname">{this.props.item.postdata.eventname} </h4>
                        <div className="modalcommentcomment">
                          {allcomments}
                        </div>          
                        <br />
                        <button onClick={this.closeModal} type="button" className="btn modalbtn" >Close</button>
                      </div>
                   </div>
                            </div>
                        </div>
  

        );
    }
}