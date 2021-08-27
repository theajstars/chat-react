import axios from 'axios'
import People from './Components/People'
import React, { Component } from 'react'
import './App.css'
export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       people: [{
         name: '',
         email: ''
       }]
    }
  }
  componentDidMount(){
    axios.get('https://chat-react.getsandbox.com/people')
      .then(res => {
        this.setState({
          people: res.data.people
        })
      })
  }
  render() {
    return (
      <div>
        <span className="title-header">Messaging <i style={{color: '#BE4BDB'}} className="fad fa-comments"></i></span>
        <div className="main">
          <People/>
        </div>
      </div>
    )
  }
}

export default App
