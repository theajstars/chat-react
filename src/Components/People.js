import React, { Component } from 'react'
import '../assets/css/People.css'
import {PeopleArray} from '../assets/People.json'
import {NewPeople} from '../assets/AddPeople.json'
import Gamer from '../assets/img/avatars/gamer.svg'
import Hacker from '../assets/img/avatars/hacker.svg'
import '../assets/css/Messaging.css'
import '../assets/css/Small-screens.css'
import {Responses} from '../assets/Responses.json'

export default class People extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            peopleArray: PeopleArray,
            newMessage: '',
            activeContact: null,
            nonFriends: NewPeople
        }
        this.contactClick = this.contactClick.bind(this)
        this.newMessageSubmit = this.newMessageSubmit.bind(this)
        this.filterContacts = this.filterContacts.bind(this)
        this.filterNewPeople = this.filterNewPeople.bind(this)
        this.addNewFriend = this.addNewFriend.bind(this)
    }

    
    componentDidMount(){
        document.querySelector('.messaging-container').style.display = 'none';
    }

    openMenu(){
        document.querySelector('#left-section').style.display = 'block'
        document.querySelector('.open-menu').style.display = 'none'
        document.querySelector('.messaging-container').style.display = 'none'
    }
    filterContacts(e){
        var person = document.getElementsByClassName('person-name')
        for(var i = 0; i < person.length; i++){
            var name = person[i].innerHTML.toLowerCase()
            var searchQuery = e.target.value.toLowerCase();
            if(name.indexOf(searchQuery) !== -1){
                person[i].parentElement.style.display = 'flex'
            }else{
                person[i].parentElement.style.display = 'none'
            }
        }
        setTimeout(() => {
            console.clear()
        }, 2000)
    }

    filterNewPeople(e){
        var person = document.getElementsByClassName('friend-name')
        for(var i = 0; i < person.length; i++){
            var name = person[i].innerHTML.toLowerCase()
            var searchQuery = e.target.value.toLowerCase();
            if(name.indexOf(searchQuery) !== -1){
                person[i].parentElement.parentElement.style.display = 'flex'
            }else{
                person[i].parentElement.parentElement.style.display = 'none'
            }
        }
        setTimeout(() => {
            console.clear()
        }, 2000)
    }

    addNewFriend(person){
        var emailArr = []
        this.state.peopleArray.forEach(personnel => {
            emailArr.push(personnel.email)
        })
        if(emailArr.indexOf(person.email) === -1){
            this.setState({
                peopleArray: this.state.peopleArray.concat([person])
            })
            document.getElementById(person.email).style.cursor = 'not-allowed'
    
            setTimeout(() => {
                document.getElementById(person.email).style.display = 'none'
                var nonFriends = this.state.nonFriends
                var index = nonFriends.indexOf(person);
                    nonFriends.splice(index, 1)
                this.setState({
                    nonFriends: nonFriends
                })
            }, 1300)
        }else{
            console.log('Person already exists')
        }
        console.log(person)
            
    }

    contactClick(person){
        this.setState({
            activeContact: person
        });
        document.querySelector('.messaging-container').style.display = 'flex'
        document.querySelector('.contact-name').innerHTML = person.name
        document.querySelector('.email').innerHTML = '<i class="far fa-envelope"></i> &nbsp;' + person.email
        var chats = document.querySelector('.chats');
            chats.innerHTML = ''
        person.messages.map(message => {
            function returnTimestamp(d){
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                var timestamp = parseInt(d);
                var date = new Date(timestamp);
                var minutes;
                if(date.getMinutes() < 10){
                    minutes = '0' + date.getMinutes()
                }else{
                    minutes = date.getMinutes();
                }
                return `${date.getHours()}:${minutes}`;
            }
            function returnFullDate(d){
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var date = parseInt(d);
                var fullDate = new Date(date);
                return `${days[fullDate.getDay()]}, ${months[fullDate.getMonth()]} ${fullDate.getDate()} ${fullDate.getFullYear()}`
            }
            
            var messageContainer = document.createElement('div');
                messageContainer.className = 'message-container'
            var avatar = document.createElement('img')
            var messageBody = document.createElement('div')
            var timeSent = document.createElement('span')
                timeSent.className = 'time-sent';
                timeSent.innerHTML = returnTimestamp(message.date)
            if(message.type === 'sent'){
                messageBody.className = 'message to-message'
                avatar.src = 'https://i.imgur.com/PAHRVpM.png'
            }else{
                messageBody.className = 'message from-message'
                avatar.src = person.avatar

            }
            messageBody.innerHTML = message.body;            
            messageContainer.appendChild(avatar)
            messageContainer.appendChild(messageBody)
            messageContainer.appendChild(timeSent)
            messageContainer.title = returnFullDate(message.date)
            chats.appendChild(messageContainer)
        })

        if(window.screen.width < 710){
            if(document.querySelector('#left-section').style.display !== 'none'){
                document.querySelector('#left-section').style.display = 'none'
                document.querySelector('.open-menu').style.display = 'block'
            }
        }
    }
    newMessageSubmit(e){
        e.preventDefault();
        var message = this.state.newMessage;
        if(message === ''){
            alert ('Please enter a message!')
        }else{
            var newMessage = {
                "type": "sent",
                "body": message,
                "date": `${Date.now()}`
            }
            var rnd = Math.round(10 * (Math.random()))

            var receivedMessage = {
                "type": "received",
                "body": Responses[rnd],
                "date": `${Date.now()}`
            }
            for(var i = 0; i < this.state.peopleArray.length; i++){
                if(this.state.peopleArray[i].email === this.state.activeContact.email){
                    var contact = this.state.peopleArray[i];
                    var contactMessages = this.state.peopleArray[i].messages;
                    contactMessages.push(newMessage)

                    setTimeout(() => {
                        contactMessages.push(receivedMessage)
                    }, 1000)
                    contact.messages = contactMessages
                    this.setState({
                        peopleArray: this.state.peopleArray
                    })
                    setTimeout(() => {
                        this.contactClick(this.state.activeContact)
                    }, 1200)
                }
            }
            document.querySelector('.new-message').value = ''
            this.setState({
                newMessage: ''
            })
            this.contactClick(this.state.activeContact)
        }
    }
    render() {
        return (
            <>
                <div className="container">
                    <span className="open-menu" onClick={() => this.openMenu()}>
                        <i className="far fa-users"></i>
                    </span>
                    <div id="left-section">
                        <div className="add-contacts-section">
                            <div className="discover-head">
                                <input type="text" name="" 
                                    placeholder="Discover people..." id="discover-input" 
                                    className="filter-people add-people" 
                                    autoFocus
                                    onInput={(e) => this.filterNewPeople(e)}
                                />
                                <span className="close-discover-menu" onClick={() => document.querySelector('.add-contacts-section').style.display = 'none'}>
                                    <i className="fas fa-times"></i>
                                </span>
                            </div>
                            <div className="contacts-section">
                                {
                                    this.state.nonFriends.map(person => {
                                        var obj = person.email
                                        return(
                                            <div className="add-friend" key={person.email} id={person.email} onClick={() => {this.addNewFriend(person); document.getElementById(`friend-added-${person.email}`).style.display = 'block'}}>
                                                <img src={person.avatar} alt="" />
                                                <div className="add-friend-details">
                                                    <span className="friend-name">
                                                        {person.name}
                                                    </span>
                                                    <span className="friend-added" id={`friend-added-${person.email}`}>
                                                        {person.name.split(" ")[0]} was added &nbsp;<i style={{'color': '#4C6EF5'}} className="fal fa-check-circle"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="people-main">
                            <div className="people-actions">
                                <input type="text" name="" id="" 
                                    placeholder="Search my contacts" className="filter-people"
                                    onInput={(e) => this.filterContacts(e)}
                                />
                                <span className="add-person" title="Add new contact" onClick={() => document.querySelector('.add-contacts-section').style.display = 'block'}>
                                    <i className="fal fa-user-plus"></i>
                                </span>
                            </div>
                            <div className="people">
                                {
                                    this.state.peopleArray.map(person => {
                                        return(
                                            <div className="person" key={person.email} onClick={(e) => this.contactClick(person)}>
                                                <img src={person.avatar} alt="" />
                                                <span className="person-name">
                                                    {person.name}
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <center>
                                <div className="send-feedback">
                                    <i className="fad fa-comment-alt-lines"></i> &nbsp; Submit feedback
                                </div>
                            </center>
                        </div>
                    </div>
                    <div className="messaging-container">
                        <div className="display-contact-details">
                            <span className="contact-name">
                                {/* Contact name goes here */}
                            </span>
                            <p className="contact-details">
                                <span className="email"></span>
                            </p>
                        </div>
                        <div>
                            <span className="message-date">
                                {/* Date goes here */}
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
                            <form action="#" id="new-message-form" onSubmit={(e) => this.newMessageSubmit(e)}>
                                <span className="attatch">
                                    <i className="far fa-paperclip"></i>
                                </span>
                                <input type="text" name="" key="input-message" className="new-message"
                                    autoComplete="false" spellCheck="false" placeholder="Type a message..." 
                                    onInput={(e) => {this.setState({newMessage: e.target.value});}}
                                />
                                <button type="submit" className="send-message">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

