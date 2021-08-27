import React, { Component } from 'react'
import '../assets/css/Messaging.css'
import Gamer from '../assets/img/avatars/gamer.svg'
// import Man from '../assets/img/avatars/man.svg'
export default class Messaging extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div className="messaging-container">
                <div>
                    <span className="contact-name">
                        Dr Braavosi
                    </span>
                    <br />
                </div>

                <div>
                    <span className="message-date">
                        Tuesday, April 7th 2021
                    </span>
                    <div className="chats">
                        <div className="message-container">
                            <img src={Gamer} alt="" />
                            <div className="message to-message">
                                Marching on to victory!
                            </div>
                        </div>
                    </div>
                </div>

                <div className="new-message-container">
                    <span className="attatch">
                        <i className="fas fa-paperclip"></i>
                    </span>
                    <input type="text" name="" key="input-message" className="new-message" autoComplete="false" spellCheck="false" autoCapitalize="true" placeholder="Type a message..." />
                    <span className="send-message">
                        <i className="fas fa-paper-plane"></i>
                    </span>
                </div>
            </div>
        )
    }
}
