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

      var nombre = firebase.auth.currentUser.displayName;
      var name2 = nombre.replace(/ +/g, "");
      /*
      fetch(`/api/createAccount?uid=${firebase.auth.currentUser.uid}&username=${name2}`)
      .then(res => res.json())
      .then(respuesta => this.setState({ respuesta }))
      .catch(err => err)
      */


    })

    
  }

  render() {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified, name2;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      uid = user.uid;
      name2 = name.replace(/ +/g, "");
    }

    


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

