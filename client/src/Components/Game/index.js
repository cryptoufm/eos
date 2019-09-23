import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Button from '@material-ui/core/Button';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Footer from '../Footer';
import { geolocated } from "react-geolocated";
import teal from '@material-ui/core/colors/teal';
import TextField from '@material-ui/core/TextField';
import { styles }             from './styles.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment';
import firebase from "firebase"


class Game extends Component {
    
         constructor(props){
             super(props)
             this.state = {
                 codigo: '',
                 longitude: 1,
                 latitude: 1,
                 started: false,
                 gameOver: false,
                 order: [1, 2, 3, 4, 5, 6],
                 current: 0,
                 hint1: false,
                 hint2: false,
                 valid: false,
                 guess: '',
                 transaction: '',
                 start: moment(),
                 data: {
                    reward: 100,
                    hint1: 20,
                    hint2: 50,
                    stations: [{
                        "id":"1",
                        "coords": {
                            "minx":"-90.405761","maxx":"-90.605479",
                            "miny":"14.504346","maxy":"14.70461515"
                        },
                        "code": "ay7f",
                        "hint1":"En camino a emprender un negocio",
                        "hint2":"Atlas en escuela de negocios",
                        "pregunta":"Debajo del mundo",
                        "name":"Estacion misteriosa"
                },
                    {
                        "id":"2",
                        "coords": {
                            "minx":"-90.505676","maxx":"-90.605432",
                            "miny":"14.594363","maxy":"14.60594"
                        },
                        "code": "xym9",
                        "hint1":"Leyendo se aprende",
                        "hint2":"Debajo de la biblioteca",
                        "pregunta":"Bajo los libros se oyen quaks",
                        "name":"Estacion libertaria"
                    },
                    {
                        "id":"3",
                        "coords": {
                            "minx":"-90.405528","maxx":"-90.505308",
                            "miny":"14.60752","maxy":"14.607782"
                        },
                        "code": "b4rc",
                        "hint1":"Conduciendo se puede ver...",
                        "hint2":"Redondel enfrente del museo",
                        "pregunta":"Nudo en un redondel",
                        "name":"Estacion capitalista"
                    },{
                        "id":"4",
                        "coords": {
                            "minx":"-90.505814","maxx":"-90.5055113",
                            "miny":"14.60793","maxy":"14.608161"
                        },
                        "code": "e9dc",
                        "hint1":"Donde se guardan las reliquias",
                        "hint2":"Enfrente del Museo",
                        "pregunta":"Donde los mayas guardan su historia",
                        "name":"Estacion de la accion"
                    },{
                        "id":"5",
                        "coords": {
                            "minx":"-90.506437","maxx":"-90.506092",
                            "miny":"14.605214","maxy":"14.605427"
                        },
                        "code": "k84c",
                        "hint1":"Multiples franquicias de restaurantes",
                        "hint2":"Cafeteria Agora",
                        "pregunta":"Donde los libertarios se reunen a comer",
                        "name":"Estacion sorprendente"
                    },{
                        "id":"6",
                        "coords": {
                            "minx":"-90.506243","maxx":"-90.505867",
                            "miny":"14.604449","maxy":"14.60484282"
                        },
                        "code": "i75j",
                        "hint1":"Estacionamiento de catedraticos",
                        "hint2":"7mo nivel edificio academico",
                        "pregunta":"Lugar mas alto de la universidad",
                        "name":"Estacion crypto"
                    }]
                }
             }
         }

    // componentDidMount() {
    //     this.getLocation();
    // }


    handleSubmit = (event) => {
                 event.prevenDefault()
                 const data = this.state
                 console.log("Data que se esta enviando: ", data)
            }
             handleInputChange = (event) => {
                 event.preventDefault()
                 this.setState({
                     [event.target.name]: event.target.value
                 })
             }

    startGame() {
        const data = this.state.data
        const stations = data.stations
        for(let i = stations.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = stations[i]
           stations[i] = stations[j]
            stations[j] = temp
        }
        console.log("suffle", data)
        // data.stations = suffle
        this.setState({
            ...this.state,
            started: true,
            data
        })
        console.log(this.state)
    }


    getLocation(){
        var msg;

        if('geolocation' in navigator){
            var options = {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                     ...this.state,
                     latitude: position.coords.latitude,
                     longitude: position.coords.longitude
                 })
                console.log(position.coords)
                console.log("state position", this.state.latitude, this.state.longitude)
            })

            //navigator.geolocation.getCurrentPosition(success, error, options)
            // function success(pos){
            //     var lng = pos.coords.longitude;
            //     var lat = pos.coords.latitude;
            //     msg = 'You appear to be at longitude: ' + lng + ' and latitude: ' + lat  + '<img src="https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=300x300&maptype=roadmap&markers=color:red%7Clabel:A%7C' + lat + ',' + lng+ '&sensor=false">'
            //     console.log(msg)
            //     this.setState({
            //        latitude: lat,
            //        longitude: lng
            //     })
            // }

            // function error(err){
            //     msg = 'Error: ' + err + ' :(';
            //     console.log(msg)
            // }
        }else{
            msg = "Sorry, looks like your browser doesn't support geolocation";
            alert(msg)
            console.log(msg)
        }

  }

  getReward(uid, amount) {
    fetch(`/api/getReward?uid=${uid}&amount=${amount}.0000`)
    .then(res => res.json())
    .then(transaction => this.setState({ transaction }))
    .catch(err => err)
  }

  getHint(uid, amount){
    fetch(`/api/getHint?uid=${uid}&amount=${amount}.0000`)
    .then(res => res.json())
    .then(transaction => this.setState({ transaction }))
    .catch(err => err)
  }


  calcQ(q) {
    const when = this.state.start
    const now = moment()
    const diff = now.diff(when, 'minutes')
    const calc = Math.floor(((60-diff)/60)*q)
    return calc
}



    showHint1() {
        if (this.state.hint1 === false) {
            const current = this.state.current
            const hint = this.state.data.stations[current].hint1
            //var user = firebase.auth().currentUser;
            //const uid = user.uid
            const uid = 'GFEDCBA'
            const calc = this.calcQ(25)
            this.getHint(uid,calc)
            alert(hint)
            //ACA QUITAR PUNTOS
            this.setState({
                ...this.state,
                hint1: true,
            })
        }
        else {
            alert("Las buenas oportunidades solo se dan una vez")
        }
    }

    showHint2() {
        if (this.state.hint2 === false) {
            const current = this.state.current
            const hint = this.state.data.stations[current].hint2
            //var user = firebase.auth().currentUser;
            //var uid = user.uid
            const uid = 'GFEDCBA'
            const calc = this.calcQ(45)
            this.getHint(uid,calc)
            alert(hint)
            //ACA QUITAR PUNTOS
            this.setState({
                ...this.state,
                hint2: true,
            })
        }
        else {
            alert("Las buenas oportunidades solo se dan una vez")
        }
    }

    handleCodeChange(event) {
        this.setState({
            ...this.state,
            guess: event.target.value
        })
        const actual = this.state.current
        const station = this.state.data.stations[actual]
        const ymax = this.state.data.stations[actual].maxy
        const ymin = this.state.data.stations[actual].miny
        const xmax = this.state.data.stations[actual].maxx
        const xmin = this.state.data.stations[actual].minx
        

        this.getLocation()
        if((station.code === event.target.value) /*&& (xmin < this.state.longitude) && (this.state.longitude < xmax) && (ymin < this.state.latitude) && (this.state.latitude < ymax)*/) {
            this.setState({
                ...this.state,
                valid: true
             })
        }
        console.log(event.target.value)
      }

    isValid() {
        ///por el momento no se usa.. se valida en handle changeCodeChange
        const  actual = this.state.current
        const station = this.state.data.stations[actual]
        if(station.code === this.state.guess) {
            this.setState({
                ...this.state,
                valid: true
             })
        }

    }

    //25 45 70    60-loquelleva /60  * cost hint 
    nextStation() {
        // ACA REWARD
        var user = firebase.auth().currentUser;
        //const uid = user.uid
             
        const calc = this.calcQ(70)
        this.getReward(uid,calc)
        if (this.state.current+1 < this.state.data.stations.length) {
            console.log('len', this.state.data.stations.length)
            console.log("station", this.state.current, this.state.data)
            const actual = this.state.current
            this.setState({
                ...this.state,
                current: actual + 1,
                valid: false
             })

        }
        else {
            this.setState({
                ...this.state,
                gameOver: true,
                started: false,
                valid: false

             })
        }
    }

    renderStation() {
        console.log("hour", this.state.start)
        const currentp = this.state.current
        const station = this.state.data.stations[currentp]
        return (
            <div>
                <div >      
        
                {/*CUENTA */}
                <div className="header">
                    <LocationOnIcon className="icon" />
                    <div> {station.name} </div>
                    <div> {station.pregunta} </div>
                </div>
                <div className="header">
                     <TextField
                        id="outlined-email-input"
                        label="code"
                        type="code"
                        name="code"
                        autoComplete="Ingresa el codigo"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => this.handleCodeChange(e)}
                    />
                </div>
                <div id="hints">
                    <div>
                        need help?
                    </div>
                    {!this.state.hint1 ? <Button variant="outlined" color="primary" onClick={() => this.showHint1()}> Hint </Button> : null}
                    {(this.state.hint1 && !this.state.hint2) ? <Button variant="outlined" color="primary" onClick={() => this.showHint2()}> Even better than the last one</Button> : null}
                    {this.state.valid ? <Button variant="outlined" color="primary" onClick={() => this.nextStation()}> Next challenge </Button> : null}
                </div>
              </div>
            </div>
            );

    }


    render() {
        return (
            <div id="wrapper">
               {!this.state.gameOver ?
                    !this.state.started ?
                    <div className="header">
                        <Button variant="outlined" color="primary" onClick={() => this.startGame()}> Start Game </Button>
                    </div>
                    : this.renderStation() :
                <div className="header">
                    <div> Game over </div>
                    <Link to={'./ranking'}>
                        <Button variant="outlined" color="primary" onClick={() => this.startGame()}> ver resultados </Button>
                    </Link>
                </div>
               }
               <Footer />
            </div>
        )
    }
  }

  export default Game;