import React from 'react';
import './style.css';
import Usuario from './user.jpg';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Button from '@material-ui/core/Button';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
// import { Api, JsonRpc, RpcError } from 'eosjs';
import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

function Profile() {
    const defaultPrivateKey = "5JZ2YfAQewJxPEspQ7aqcdZx5eNPkPQgpRw1WopwixLU56XAeL8"; // bob
    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    const rpc = new JsonRpc('https://jungle2.cryptolions.io', { fetch });
    rpc.get_currency_balance('eosio.token', 'ricardojmv54', 'EOS').then((balance) => console.log("account", balance));
    return (
    <div className="page">
        <div className="header">
            {/*
            <img 
                className="user-photo"
                //src="https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/19990550_320504011710462_6233984476058453731_n.jpg?_nc_cat=108&_nc_oc=AQmR0T4NP73IDG4np1E9mU5bJNsAmGzlCxrtRzb5ol8ztra1rcefx1Wx0p3lHMhlbag&_nc_ht=scontent-mia3-2.xx&oh=ff41751e6aca773d7510a135c8e4f800&oe=5DF13CFA"
                src={Usuario}
            />
            */}
        </div>
        <div className="detalles">
            

        <div className="hola">
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
            Satoshi
            </Typography>
            <Typography gutterBottom variant="h4">
            Nakamoto
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
                <Typography gutterBottom variant="h6">
                    NakaToshi2323
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


        {/*Cuenta Publica
        <Grid container alignItems="center" className="cuenta">
            <Grid item xs={1}>
            <AccountTreeIcon color="secondary" />
            </Grid>
            <Grid item>
                <Typography gutterBottom variant="h6">
                    150.0000 MarroCoins
                </Typography>
            </Grid>
        </Grid>
        */}

        <Button variant="outlined" color="primary"> Private Key</Button>
      </div>

        </div>
    </div>
    );
  }

  export default Profile;