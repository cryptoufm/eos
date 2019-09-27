import React, { Component } from "react"
import firebase from "firebase"
import './style.css';
import Tesoro from './treasure.png'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
      localStorage.clear();
      console.log("user:", user)
    })
  }

  async signout_and_clearLocal() {
      try {
        firebase.auth().signOut()
        console.log('USER LOGGED OUT')
        localStorage.clear();

    } catch(err) {
        console.log(err)
    }
  }


  async createAccount() {
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    const name1 = user.displayName; 
    var name2 = name1.replace(/ +/g, "");
    var matches = name2.replace(/[^a-zA-Z0-5]+/g, '');
    matches = matches.toLowerCase()
    console.log("name2", matches)
    var matches2 = matches.padEnd(5, '0')
    if(matches2.length > 6) {matches = matches2.substring(0,6)};

      try {
        const resp = await fetch(`http://3.87.208.133:5000/createAccount?uid=${uid}&username=${matches}&amount=100.0000`)
        console.log(`http://3.87.208.133:5000/createAccount?uid=${uid}&username=${matches}&amount=100.0000`)
        console.log("resp", resp)
        var data = await resp.json();
        console.log("respuesta join", data)
        if( data && data.action.indexOf('error') === -1) {
            console.log("join ", data)
            localStorage.setItem('matchCode', this.state.joinCode);
            this.setState({ respuesta: data })
       }

    } catch(err) {
        console.log(err)
    }


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
            <div className="buttonsContainer">
              <Link to={'./profile'}>
                <Button variant="contained" color="secondary" onClick={() => this.createAccount()}>Join Human Action!</Button>
              </Link>
              <Link to={'./'}>
                <Button variant="contained" onClick={() => this.signout_and_clearLocal()}>Sign out!</Button>
              </Link>
            </div>
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

