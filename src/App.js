import React, { Component } from 'react';
import firebase from 'firebase';

import FileUpload from './FileUpload'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      user:null
    };
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({
        user
      })
    })
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result=>console.log(`${result.user.email} ha iniciado sesion`)).catch(error=> console.log(`Error ${error.code}:${error.message}`));
  }
  handleLogout(){
    firebase.auth().signOut().then(result=>console.log(`${result.user.email} ha salido`)).catch(error=> console.log(`Error ${error.code}:${error.message}`));
  }

  renderLoginButton(){
    if(this.state.user){
      return (
        <div>
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}</p>
          <button onClick={this.handleLogout.bind(this)}>Salir</button>
          <FileUpload/>
        </div>
      )
    }else{
      return (<button onClick={this.handleAuth.bind(this)}>Login con Google</button>)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Pseudogram</h2>
        </header>
        <div className="App-intro">
          {this.renderLoginButton()}
        </div>
      </div>
    );
  }
}

export default App;
