import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Contact = (props)=>{
  return (
            <div style={{margin:'1em'}}>
            <img width="75" src={props.avatar_url} alt=''/>
            <div style={{display:'inline-block',marginLeft:10}}>
              <div style={{fontSize:'1.25em',fontWeigt:'bold'}}>{props.name}</div>
              <div>{props.company}</div>
            </div>
            </div> 
          )
}

const ContactList = (props) => {
  return (
    props.contact.map((contactInfo)=>(<Contact key={contactInfo.id} {...contactInfo} />))
  )
}

class Form extends Component {
  state = { userName : ''};
  handleSubmit = (event) =>{
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then((response)=> {
        this.props.onSubmit(response.data);
        this.setState({userName:''});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render(){
    return <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.userName} onChange={(event)=>{this.setState({userName:event.target.value})}} placeholder="Github Username:" required></input>
              <button type="submit">Add Card</button>
            </form>
    </div>
  }
} 

class App extends Component {
  state = {cards:[
    {key:"2",name:"Chris Wanstrath",company:"@github",avatar_url:"https://avatars0.githubusercontent.com/u/2?v=4"},
    {key:"3",name:"PJ Hyett",company:"GitHub, Inc.",avatar_url:"https://avatars0.githubusercontent.com/u/3?v=4"}
    //{name:"",companyName:"",avatarURL:""}
  ]};
  addCards=(userInfo)=>{
    this.setState((prevState)=>({
      cards:prevState.cards.concat(userInfo)
    }));
  }
  render() {
    return (
      <div className="App1">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Form onSubmit={this.addCards}/>
        <ContactList contact={this.state.cards}/>
      </div>
    );
  }
}

export default App;
