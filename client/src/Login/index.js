import React, { Component } from "react"
import firebase from "firebase"
import './style.css';
import Grid from '@material-ui/core/Grid';
import Tesoro from './treasure.png'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyAU7bPRjmCjv_GOJ-UFVyTKpoC7ApulO2Q",
  authDomain: "marrocoin-1568511959956.firebaseapp.com"
})

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      respuesta: []
    }
  }

  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)


    })

    
  }


  createAccount() {
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    const name1 = user.displayName; 
    var name2 = name1.replace(/ +/g, "");
    name2 = name2.padEnd(5, '0')
    if(name2.length > 6) name2 = name2.substring(0,6);

      fetch(`/api/createAccount?uid=${uid}&username=${name2}`)
      .then(res => res.json())
      .then(respuesta => this.setState({ respuesta }))
      .catch(err => err)
  }

  render() {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified, name2;

    return (
      <div className="pageI">
        {this.state.isSignedIn ? (
          <div className="d1">
            <div>
            <img className="photo-tes"
                alt="profile picture"
                src={Tesoro}
              />
            </div>
            <h1>Bienvenido</h1>
            <h3>{firebase.auth().currentUser.displayName}</h3>
            <div>
              <img className="photo-user"
                alt="profile picture"
                src={firebase.auth().currentUser.photoURL}
              />
            </div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <button onClick={() => this.createAccount()}>Join Human Action!</button>
        
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}

      </div>
    )
  }
}

export default Login;

