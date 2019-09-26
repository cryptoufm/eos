import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Button from '@material-ui/core/Button';
import { styles }             from './styles.css'
import { Redirect } from 'react-router-dom'
import firebase from "firebase"


class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      newMatch: false,
      code: '',

    }
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    if(localStorage.getItem('matchCode')) {
      this.setState({
      match: localStorage.getItem('matchCode')
    })
    }
    if (user) {
        this.setState({
            currentUser: user.uid
        })
    }
  }

  /*getCreate()  {
    fetch('http://3.87.208.133:5000/createMatch?password=Queteimporta123&maximum=100000.0000')
    .then(res => res.json())
    .then(code => this.setState({ code, newMatch: true }))
    .catch(err => err)
  }

  async createButton2() {
    await this.getCreate()
    if (this.state.code.indexOf('error') === -1) {
      const parsed = JSON.parse(this.state.code)
      const code = parsed.match
      localStorage.setItem('matchCode', code);
    }
  }*/


  async createButton() {

    try {
        const resp = await fetch('http://3.87.208.133:5000/createMatch?password=Queteimporta123&maximum=100000.0000')
        var data = await resp.json();
        if( data && data.action.indexOf('error') === -1) {
            console.log("join ", data)
            this.setState({
              code: data.action,
              newMatch: true
            })
       }

    } catch(err) {
        console.log(err)
    }

}

renderRedirect = () => {
  console.log("redirect")
  return <Redirect to='/' />
}

  render() {
    var user = firebase.auth().currentUser;
    if(this.state.match && this.state.match.length > 0 && user) {
      return (
        <div className="wrapper">
          <div className="headerCreate">
            Finaliza la partida en curso.
          </div>
          <Footer />
        </div>
      )
    }
    if (user) {
      return (
        <div className="wrapper">
          <div className="headerCreate">
          {
            !this.state.newMatch ?
              null
            : <div> {this.state.code} </div>
          }
          <Button variant="outlined" color="primary" onClick={() => this.createButton()}> Create Match </Button>
          </div>
          <Footer />
        </div>
      );
    }
    return(
      this.renderRedirect()
    )
  }
}

export default List;
