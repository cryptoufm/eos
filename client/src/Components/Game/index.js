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
                 data: {
                    reward: 100,
                    hint1: 20,
                    hint2: 50,
                    stations: [{
                        "id":"1",
                        "coords": {
                            "x1":"-90.505627","y1":"14.604346",
                            "x2":"-90.50559185","y2":"14.60442246",
                            "x3":"-90.50567632","y3":"14.60436332",
                            "x4":"-90.505479","y4":"14.604436"
                        },
                        "code": "ay7f",
                        "hint1":"hola1",
                        "hint2":"hola2",
                        "pregunta":"Donde es esto",
                        "name":"Estacion misteriosa"
                },
                    {
                        "id":"2",
                        "coords": {
                            "x1":"-90.505432","y1":"14.605253",
                            "x2":"-90.50540619","y2":"14.60550398",
                            "x3":"-90.505463","y3":"14.605940",
                            "x4":"-90.50565508","y4":"14.60588374"
                        },
                        "code": "xym9",
                        "hint1":"hola1",
                        "hint2":"hola2",
                        "pregunta":"Donde es esto",
                        "name":"Estacion misteriosa2"
                    },
                    {
                        "id":"3",
                        "coords": {
                            "x1":"-90.505308","y1":"14.607521",
                            "x2":"-90.50545202","y2":"14.60752042",
                            "x3":"-90.50552779","y3":"14.60770161",
                            "x4":"-90.505316","y4":"14.607782"
                        },
                        "code": "b4rc",
                        "hint1":"hola1",
                        "hint2":"hola2",
                        "pregunta":"Donde es esto",
                        "name":"Estacion misteriosa3"
                    },{
                        "id":"4",
                        "coords": {
                            "x1":"-90.50553645","y1":"14.60792996",
                            "x2":"-90.505814","y2":"14.607938",
                            "x3":"-90.50551126","y3":"14.60805315",
                            "x4":"-90.505733","y4":"14.608161"
                        },
                        "code": "e9dc",
                        "hint1":"hola1",
                        "hint2":"hola2",
                        "pregunta":"Donde es esto",
                        "name":"Estacion misteriosa4"
                    },{
                        "id":"5",
                        "coords": {
                            "x1":"-90.506092","y1":"14.605294",
                            "x2":"-90.506283","y2":"14.605427",
                            "x3":"-90.50628688","y3":"14.60521395",
                            "x4":"-90.50643709","y4":"14.6053888"
                        },
                        "code": "k84c",
                        "hint1":"hola1",
                        "hint2":"hola2",
                        "pregunta":"Donde es esto",
                        "name":"Estacion misteriosa5"
                    },{
                        "id":"6",
                        "coords": {
                            "x1":"-90.505867","y1":"14.604652",
                            "x2":"-90.5061779","y2":"14.6048341",
                            "x3":"-90.506124","y3":"14.604449",
                            "x4":"-90.50624299","y4":"14.60484282"
                        },
                        "code": "i75j",
                        "hint1":"hola1",
                        "hint2":"hola2",
                        "pregunta":"Donde es esto",
                        "name":"Estacion misteriosa6"
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

    showHint1() {
        if (this.state.hint1 === false) {
            const current = this.state.current
            const hint = this.state.data.stations[current].hint1
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
        this.getLocation()
        if(station.code === event.target.value) {
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

    nextStation() {
        // ACA REWARD
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

        const currentp = this.state.current
        const station = this.state.data.stations[currentp]
        return (
            <div>
                <div >      
        
                {/*CUENTA */}
                <div className="header">
                    <LocationOnIcon className="icon" />
                    <div> {station.name} </div>
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