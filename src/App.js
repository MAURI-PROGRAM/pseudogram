import React, { Component } from 'react';
import firebase from 'firebase';

import FileUpload from './FileUpload'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      user:null,
      pictures:[]
    };
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({
        user
      })
    });
    firebase.database().ref('pictures').on('child_added',snapshot=>{
      this.setState({
        pictures:this.state.pictures.concat(snapshot.val())
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

  handleUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed',snapshot =>{
        let percentage=(snapshot.bytesTransferred/snapshot.totalBytes*100);
        this.setState({
            uploadValue:percentage
        })
    },error=>{console.log(error.message)},async ()=>{
        var imagen;
        await task.snapshot.ref.getDownloadURL().then( downloadURL=> {
            imagen= downloadURL; 
          });
        const record ={
          photoURL: this.state.user.photoURL,
          displayName:this.state.user.displayName,
          image:imagen
        };
        const dbRef = firebase.database().ref('pictures');
        const newPictures = dbRef.push();
        newPictures.set(record);
    });
}
  renderLoginButton(){
    if(this.state.user){
      return (
        <div>
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}</p>
          <button onClick={this.handleLogout.bind(this)}>Salir</button>


          <FileUpload onUpload={this.handleUpload.bind(this)}/>

          {
            this.state.pictures.map(picture=>(
            <div>
              <img  src = {picture.image} alt="mix"/>
              <br/>
              <img src={picture.photoURL} alt={picture.displayName}/>
              <br/>
              <span>{picture.displayName}</span>
            </div>
            )).reverse()
          }

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
