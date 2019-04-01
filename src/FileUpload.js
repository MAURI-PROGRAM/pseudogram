import React,{Component} from 'react';
import firebase from 'firebase';
class FileUpload extends Component{

    constructor(){
        super();
        this.state={
            uploadValue:0,
            picture:null
        }
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
              this.setState({
                uploadValue:100,
                picture: imagen
                });
        });
    }
    render(){
        return(
            <div>
                <progress value={this.state.uploadValue} max='100'></progress>
                <br/>
                <input type="file" onChange={this.handleUpload.bind(this)}/>
                
                <img width="320" src={this.state.picture} alt="name" />
            </div>
        )
    }
}

export default FileUpload;