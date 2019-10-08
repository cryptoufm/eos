import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
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
import ReactCountdownClock from 'react-countdown-clock'
// import { currentId } from 'async_hooks';


class Game extends Component {
    
         constructor(props){
             super(props)
             this.state = {
                 codigo: '',
                 longitude: 1,
                 latitude: 1,
                 started: localStorage.getItem('started') ? JSON.parse(localStorage.getItem('started')) : false, //local stg
                 gameOver: false,
                 current: localStorage.getItem('current') ? JSON.parse(localStorage.getItem('current')) : 0,
                 tried: false,
                 hint1: localStorage.getItem('hint1') ?  JSON.parse(localStorage.getItem('hint1')) : false, //local stg
                 hint2: localStorage.getItem('hint2') ?  JSON.parse(localStorage.getItem('hint2')) : false, //local stg
                 valid: false,
                 joinCode: localStorage.getItem('matchCode') || '',
                 typed: false,
                 join: false, //CAMBIAR
                 guess: '',
                 transaction: '',
                 start: localStorage.getItem('startHour') ? localStorage.getItem('startHour') : moment(), //local stg
                 data: localStorage.getItem('dataGame') ? JSON.parse(localStorage.getItem('dataGame')) : {
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
                            "minx":"-90.505722","maxx":"-90.505661",
                            "miny":"14.605732","maxy":"14.605829"
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
                        "hint1":"Conduciendo al parqueo se puede ver",
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
                    }] //local stg
                }
             }
         }

    componentDidMount() {
        //PARA REDIRECT EN SU COMPONENTE PONGAN ESTOOOOOO
        var user = firebase.auth().currentUser;
        let uid = user.uid
        uid = uid.replace(/[^a-zA-Z0-9]+/g, '');
        if (user) {
            this.setState({
                currentUser: uid
            })
        }
        //END REDIRECT
    }


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

        //  ACA JOIN GAME
        const data = this.state.data
        const stations = data.stations
        const startHour = moment()
        for(let i = stations.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = stations[i]
            stations[i] = stations[j]
            stations[j] = temp
        }
        // console.log("suffle", data)
        // data.stations = suffle
        localStorage.setItem('dataGame', JSON.stringify(data));
        localStorage.setItem('startHour', startHour);
        localStorage.setItem('started', true);
        localStorage.setItem('current', 0);
        //  const datastg = localStorage.getItem('current');
        //  console.log("localstg", JSON.parse(datastg))

        this.setState({
            ...this.state,
            started: true,
            start: startHour,
            data
        })
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

  getReward(uid, amount, match) {
    fetch(`http://3.87.208.133:5000/getReward?uid=${uid}&amount=${amount}.0000&match=${match}`)
    .then(res => res.json())
    .then(transaction => this.setState({ transaction }))
    .catch(err => err)
  }

  getHint(uid, amount, match){
    fetch(`http://3.87.208.133:5000/getHint?uid=${uid}&amount=${amount}.0000&match=${match}`)
    .then(res => res.json())
    .then(transaction => this.setState({ transaction }))
    .catch(err => err)
  }


  calcQ(q) {
    const when = this.state.start
    const now = moment()
    const diff = now.diff(when, 'minutes')
    console.log("diferencia", diff)
    const calc = Math.floor(((60-diff)/60)*q) ///DUDAAAA
    if (calc < 0) {
        calc = 0
        return calc
    }
    return calc
}

getMinutes(q) {
    const when = this.state.start
    const now = moment()
    const diff = now.diff(when, 'seconds')
    const calc = 3600-diff ///DUDAAAA
    if (calc < 0) {
        calc = 0
        return calc
    }
    return calc
}



    showHint1() {
        if (this.state.hint1 === false) {
            const current = this.state.current
            const hint = this.state.data.stations[current].hint1
            const uid = this.state.currentUser //'1234567890'
            const calc = this.calcQ(25)
            const match = this.state.joinCode
            this.getHint(uid,calc, match)
            alert(`se debito ${calc} Mises de tu cuenta de blockchain`)
            //ACA QUITAR PUNTOS
            localStorage.setItem('hint1', true);
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
            const uid = this.state.currentUser //'1234567890'
            // const uid = this.state.currentUser
            const calc = this.calcQ(45)
            const match = this.state.joinCode
            this.getHint(uid,calc, match)
            alert(`se debito ${calc} Mises de tu cuenta de blockchain`)
            localStorage.setItem('hint2', true);
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
      }


    handleJoinChange(event) {
    this.setState({
        ...this.state,
        joinCode: event.target.value,
        typed: true,
    })
    }

    join(uid, match, time) {
        fetch(`/api/joinMatch?uid=${uid}&match=${match}&time=${time}`)
        .then(res => res.json())
        .then(joinResult => this.setState({ joinResult }))
        .catch(err => err)

        console.log("join result", this.state.joinResult)
    }


     async joinValidation() {

        const code = this.state.joinCode
        //var user = await firebase.auth().currentUser;
        //var uid = user.uid
        const uid = this.state.currentUser //'1234567890'
        // const uid = this.state.currentUser
        //var user = firebase.auth().currentUser;
        //const uid = user.uid
        const hour = moment().format("HH:mm:ss")
        console.log("UIDDDDDDD", uid)
        try {
            const resp = await fetch(`http://3.87.208.133:5000/joinMatch?uid=${uid}&match=${code}&time=${hour}`)
            var data = await resp.json();
            console.log("respuesta join", data)
            if( data && data.action.indexOf('error') === -1) {
                console.log("join ", data)
                localStorage.setItem('matchCode', this.state.joinCode);
                this.setState({
                    ...this.state,
                    join: true
                })
           }

        } catch(err) {
            console.log(err)
        }
        console.log("no entra")

    }

    isValid() {
        const actual = this.state.current
        const station = this.state.data.stations[actual]
        const ymax = this.state.data.stations[actual].maxy
        const ymin = this.state.data.stations[actual].miny
        const xmax = this.state.data.stations[actual].maxx
        const xmin = this.state.data.stations[actual].minx
        this.setState({
            ...this.state,
            tried: true
         })

        this.getLocation()
        if((station.code === this.state.guess) /*&& (xmin < this.state.longitude) && (this.state.longitude < xmax) && (ymin < this.state.latitude) && (this.state.latitude < ymax)*/) {
            this.setState({
                ...this.state,
                valid: true,
                tried: false
             })
        }
    }

    //25 45 70    60-loquelleva /60  * cost hint 
    nextStation() {
        /// ACA REWARD
        // var user = firebase.auth().currentUser;
        //const uid = user.uid
        const uid = this.state.currentUser //'1234567890'
        // const uid = this.state.currentUser
        const calc = this.calcQ(70)
        const match = this.state.joinCode
        this.getReward(uid,calc, match)
        //alert(`ganaste ${calc} Mises, se remuneraron en tu cuenta de blockchain`)
        if (this.state.current+1 < this.state.data.stations.length) {
            console.log('len', this.state.data.stations.length)
            console.log("station", this.state.current, this.state.data)
            const actual = this.state.current
            localStorage.setItem('hint1', false);
            localStorage.setItem('hint2', false);
            localStorage.setItem('current', actual+1);
            this.setState({
                ...this.state,
                current: actual + 1,
                valid: false,
                tried: false,
                hint1: false,
                hint2: false,
                guess: ''
             })
            alert(`Se han acreditado ${calc} Mises a tu cuenta en blockchain`)

        }
        else {
            localStorage.setItem('hint1', false);
            localStorage.setItem('hint2', false);
            localStorage.setItem('started', false);
            localStorage.removeItem('startHour');
            localStorage.removeItem('dataGame');
            localStorage.removeItem('current');
            localStorage.removeItem('matchCode');
            this.setState({
                ...this.state,
                gameOver: true,
                started: false,
                valid: false,
                hint1: false,
                hint2: false,
                guess: ''

             })
        }
    }

     //PARA REDIRECT EN SU COMPONENTE PONGAN ESTOOOOOO
    renderRedirect = () => {
        console.log("redirect")
        return <Redirect to='/' />
    }
    //END REDIRECT

    renderStation() {
        console.log("hour", this.state.start)
        const currentp = this.state.current
        const station = this.state.data.stations[currentp]
        const hint1 = this.state.data.stations[currentp].hint1
        const hint2 = this.state.data.stations[currentp].hint2
        const minutes = this.getMinutes()
        console.log("MINUTOOOSSS", minutes)
        return (
            <div className="wrapperGame" id="mainGameee">    
              <div className="headerGame">
                    <ReactCountdownClock
                        seconds={minutes}
                        color="#b87bd4"
                        alpha={0.9}
                        timeFormat="hms"
                        size={100}
                    />
                    <LocationOnIcon />
                    <div className="stationTitle"> {station.name} </div>
                    <div className="stationSub"> {station.pregunta} </div>
                    {(!this.state.valid && this.state.tried) ? <div className="wrong">Codigo incorrecto o lugar incorrecto</div> : null}
                     <TextField
                        id="outlined-error"
                        id="outlined-email-input"
                        label="Ingresa el codigo"
                        type="code"
                        name="code"
                        autoComplete="Ingresa el codigo"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => this.handleCodeChange(e)}
                    />
                    <div  className="text">
                        <b > necesitas ayuda? </b> <br /> Esta ayuda tiene un costo <br />
                    </div >
                    <div className="textMini">
                        La primera pista cuesta 25 Mises <br /> y la segunda 45 Mises.
                    </div>
                    {!this.state.hint1 ? <Button variant="contained" color="primary" onClick={() => this.showHint1()}> Pista </Button> : null}
                    {this.state.hint1 ? <div className="text"> <b>Hint1: </b> {hint1}</div> : null}
                    {this.state.hint2 ? <div  className="text">  <b>Hint2: </b> {hint2}</div> : null}
                    {(this.state.hint1 && !this.state.hint2) ? <Button variant="contained" color="primary" onClick={() => this.showHint2()}> Pista (mejor que la anterior)</Button> : null}
                    {this.state.valid ? <Button variant="contained" color="secondary" onClick={() => this.nextStation()}> Siguiente reto </Button> 
                    : <div className="validButton"> <Button variant="contained" color="primary" onClick={() => this.isValid()}> validar </Button> </div>
                    }
            </div>
         </div>
       );

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
        console.log("USEEERRR", this.state.currentUser)
        return (
            <div id="wrapperMain">
               {!this.state.gameOver ?
                    !this.state.started ?
                    <div className="headerGame">
                      <TextField
                        error={this.state.join}
                        id="outlined-error"
                        id="outlined-email-input"
                        label={ this.state.join ? "Codigo correcto" : "Ingresa el codigo" }
                        type="code"
                        name="code"
                        autoComplete="Ingresa el codigo"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => this.handleJoinChange(e)}
                    />
                        {this.state.join ? <Button variant="contained" color="secondary" onClick={() => this.startGame()}> Iniciar Juego </Button> : <Button variant="contained" color="primary" onClick={() => this.joinValidation()}> Unirse a la partida </Button>}
                    </div>
                    : this.renderStation() :
                <div className="header">
                    <div> Game over </div>
                    <Link to={'./ranking'}>
                        <Button variant="outlined" color="primary" > ver resultados </Button>
                    </Link>
                </div>
               }
               <Footer />
            </div>
        )
    }
  }

  export default Game;
