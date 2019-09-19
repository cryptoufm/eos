import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Button from '@material-ui/core/Button';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Footer from '../Footer';

class Game extends Component {
    
         constructor(props){
             super(props)
             this.state = {
                 codigo: ''
             }
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

    render() {

        return (
            <div >
                
                <div >
                    
        
                <div >
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom>
                    Estacion no. 1
                    </Typography>
                    <Typography gutterBottom >
                    Ve hacia donde se oye "quak"
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom>
                    
                    </Typography>
                  </Grid>
                </Grid>
        
                {/*CUENTA */}
                <Grid container alignItems="center" >
                    <Grid item xs={1}>
                    <PersonIcon color="secondary" />
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6">
                        Estacion no. 1
                        </Typography>
                    </Grid>
                </Grid>
        
                <Button variant="outlined" color="primary"> Primera hint</Button>
                <Button variant="outlined" color="primary"> Segunda hint</Button>
        
                {/* <Form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Ingrese codigo' value={name} name='codigo' onChange={this.handleInputChange}/>
                    <button>Enviar codigo</button>
                </Form> */}
                
              </div>
        
                </div>
                <Footer />
            </div>
            );

    }
  }

  export default Game;