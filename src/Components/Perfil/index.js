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
import { Redirect } from 'react-router-dom'


class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      res: []
    }
    
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
        console.log("user", user)
    })

    //PARA REDIRECT EN SU COMPONENTE PONGAN ESTOOOOOO
    var user = firebase.auth().currentUser;
    if (user) {
        this.setState({
            currentUser: user.uid
        })
        this.getRows(user.uid);
    }

    //END REDIRECT
  }

  renderRedirect = () => {
    console.log("redirect")
    return <Redirect to='/' />
}



  /*componentWillMount() {
    this.getRows();
  }*/

  async getRows(uid) {
    try {
      const resp = await fetch(`http://3.87.208.133:5000/getProfile?uid=${uid}`)
      console.log(`http://3.87.208.133:5000/getProfile?uid=${uid}`)
      var data = await resp.json();
      console.log("respuesta join", data)
      if( data ) {
          console.log("join ", data)
          this.setState({
              ...this.state,
              res: data
          })
     }

  } catch(err) {
      console.log(err)
  }

  }


  renderBalance() {
    console.log("res balance", this.state.res)
    return (
      <Typography gutterBottom variant="h6">
        {`Resp: ${this.state.res}`}
      </Typography>
    )
  }


  render() {

    //PARA REDIRECT EN SU COMPONENTE PONGAN ESTOOOOOO
    var user = firebase.auth().currentUser;
    if(!user) {
        return(
            this.renderRedirect()
        )
    }
    //END REDIRECT
    

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
                    {(this.state.res) ? this.state.res.account : null}
                </Typography>
            </Grid>
        </Grid>
 
        {/*Balance */}
        <Grid container alignItems="center" className="cuenta">
            <Grid item xs={1}>
            <LocalAtmIcon color="secondary" />
            </Grid>
            <Grid item>
                
                {/*this.state.res ? this.renderBalance() : null*/}
                {`${(this.state.res) ? this.state.res.balance : null} Mises`}
                
            </Grid>
        </Grid>

        <Button variant="outlined" color="primary" onClick={() => alert(`Private Key: \n ${(this.state.res) ? this.state.res.privatekey : null}`)} > Private Key</Button>
        <p> </p>
        <Button variant="outlined" color="primary" onClick={() => firebase.auth().signOut()}>Sign out</Button>
      </div>

        </div>
    </div>
      )
    }
  }


  export default Profile