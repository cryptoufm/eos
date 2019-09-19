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

// import { Api, JsonRpc, RpcError } from 'eosjs';
// import { Api, JsonRpc, RpcError } from 'eosjs';
// import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';


class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
        console.log("user", user)
    })

    //this.getList();
    //console.log(this.state.list)
  }

  // getList = () => {
  //   fetch('54.163.3.27:5000/createAccount?uid=${uid}&account=${user}')
  //   .then(res => res.json())
  //   .then(list => this.setState({ list }))
  //   .catch(err => err)
  // }

  render() {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified, name2;
    console.log(user);

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      uid = user.uid;
      name2 = name.replace(/ +/g, "");
    }
    console.log(uid);

    //var resp;

    fetch(`http://54.163.3.27:5000/createAccount?uid=${uid}&account=${name2}`)
      .then(res => res.json())
      .then(data => resp = data)
      .then(() => console.log(resp))
      .catch(err => err)
    //const urls = `http://54.163.3.27:5000/createAccount?uid=${uid}&account=${name2}`


    const { list } = this.state;
    console.log("lista", list) 
    //resp = JSON.parse(resp);
    //http://54.163.3.27:5000/createAccount?uid=askdfjqkwjerr&account=ricardojmv

    return (

    <div className="page">
        <Footer />
        <div className="header">
            <img className="user-photo" src={photoUrl} />
        </div>

        <div className="detalles">
        <div className="hola">
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              {obj}
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
            <EmailIcon color="secondary" />
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
                    150.0000 MarroCoins
                </Typography>
            </Grid>
        </Grid>

        <Button variant="outlined" color="primary"> Private Key</Button>
        <p> </p>
        <Button variant="outlined" color="primary" onClick={() => firebase.auth().signOut()}>Sign out</Button>
      </div>

        </div>
    </div>
      )
    }
  }


  export default Profile


// function Profile() {
//     // const defaultPrivateKey = "5JZ2YfAQewJxPEspQ7aqcdZx5eNPkPQgpRw1WopwixLU56XAeL8"; // bob
//     // const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
//     // const rpc = new JsonRpc('https://jungle2.cryptolions.io', { fetch });
//     // rpc.get_currency_balance('eosio.token', 'ricardojmv54', 'EOS').then((balance) => console.log("account", balance));
//     return (
//     <div className="page">
//         <div className="header">
//             {/*
//             <img 
//                 className="user-photo"
//                 //src="https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/19990550_320504011710462_6233984476058453731_n.jpg?_nc_cat=108&_nc_oc=AQmR0T4NP73IDG4np1E9mU5bJNsAmGzlCxrtRzb5ol8ztra1rcefx1Wx0p3lHMhlbag&_nc_ht=scontent-mia3-2.xx&oh=ff41751e6aca773d7510a135c8e4f800&oe=5DF13CFA"
//                 src={Usuario}
//             />
//             */}
//         </div>
//         <div className="detalles">
            

//         <div className="hola">
//         <Grid container alignItems="center">
//           <Grid item xs>
//             <Typography gutterBottom variant="h4">
//             Satoshi
//             </Typography>
//             <Typography gutterBottom variant="h4">
//             Nakamoto
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Typography gutterBottom variant="h6">
            
//             </Typography>
//           </Grid>
//         </Grid>

//         {/*CUENTA */}
//         <Grid container alignItems="center" className="cuenta">
//             <Grid item xs={1}>
//             <PersonIcon color="secondary" />
//             </Grid>
//             <Grid item>
//                 <Typography gutterBottom variant="h6">
//                     NakaToshi2323
//                 </Typography>
//             </Grid>
//         </Grid>

//         {/*Balance */}
//         <Grid container alignItems="center" className="cuenta">
//             <Grid item xs={1}>
//             <LocalAtmIcon color="secondary" />
//             </Grid>
//             <Grid item>
//                 <Typography gutterBottom variant="h6">
//                     150.0000 MarroCoins
//                 </Typography>
//             </Grid>
//         </Grid>


//         {/*Cuenta Publica
//         <Grid container alignItems="center" className="cuenta">
//             <Grid item xs={1}>
//             <AccountTreeIcon color="secondary" />
//             </Grid>
//             <Grid item>
//                 <Typography gutterBottom variant="h6">
//                     150.0000 MarroCoins
//                 </Typography>
//             </Grid>
//         </Grid>
//         */}

//         <Button variant="outlined" color="primary"> Private Key</Button>
//       </div>

//         </div>
//     </div>
//     );
//   }

//   export default Profile;