import React, { Component } from 'react';
import './style.css';
import Usuario from './user.jpg';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Button from '@material-ui/core/Button';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Footer from '../Footer';
import firebase from "firebase"
import EmailIcon from '@material-ui/icons/Email';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


// import { Api, JsonRpc, RpcError } from 'eosjs';
// import { Api, JsonRpc, RpcError } from 'eosjs';
// import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
var nombres;

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      balance: "200000"
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
        console.log("user", user)

      /*
      nombres = firebase.auth().currentUser.displayName;
      fetch(`/api/getProfile?uid=${firebase.auth.currentUser.uid}`)
      .then(res => res.json())
      .then(info => this.setState({ info }))
      .catch(err => err)
      */
     
      //let rowsjson = JSON.parse("[" + this.state.info + "]");
      //const json = rowsjson[0]

    })

    // function llamar_carlos():
    //    cujcuj = cujcujx3
    //    return(carlos aparece)
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


    /*
    fetch(`/api/getBalance?uid=${uid}`)
      .then(res => res.json())
      .then(balance => this.setState({ balance }))
      .catch(err => err)
    */
    //const urls = `http://54.163.3.27:5000/createAccount?uid=${uid}&account=${name2}`


    const { list } = this.state;
    console.log("lista", list) 

     

    return (

    <div className="page">
        <Footer />
        <div className="header">
            
        </div>

        <div className="detalles">
        <img className="user-photo" src={photoUrl} />
        <div className="hola">
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              
            </Typography>
            <Typography gutterBottom variant="h4" >
              {name} 
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
            </Typography>
          </Grid>
        </Grid>

        {/*CUENTA */}
        <Grid container alignItems="center" className="cuenta">
            <Grid item xs={1}>
            <PersonIcon color="secondary" />
            </Grid>
            <Grid item>
                <Typography gutterBottom variant="h7">
                    {/*NakaToshi2323*/}
                    {email}
                </Typography>
            </Grid>
        </Grid>
 
        {/*Balance */}
        <Grid container alignItems="center" className="cuenta">
            <Grid item xs={1}>
            <LocalAtmIcon color="secondary" />
            </Grid>
            <Grid item>
                <Typography gutterBottom variant="h6">
                20000
                </Typography>
            </Grid>
        </Grid>

        <Button variant="outlined" color="primary" onClick={() => alert("5Js36uNKqHvanD6MU2XScMHchs5k733azdRRKzGJcQT3roTmdCd")} > Private Key</Button>
        <p> </p>
        <Button variant="outlined" color="primary" onClick={() => firebase.auth().signOut()}>Sign out</Button>
      </div>

        </div>
    </div>
      )
    }
  }


  export default Profile