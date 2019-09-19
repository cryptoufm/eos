import React, { Component }   from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styles }  from './ranking.css';
import players from'./players';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';




class Ranking extends Component {

  constructor(props){
    super(props);
    this.state = {
      rows: []
    }
  }

  createData(name, Tokens) {
    return { name, Tokens};
  }



  render() {

    

  //<JsonToTable json={players} />  

    // const rows = [
    // this.createData('Luis Araneda', 148),
    // this.createData('Nicole Stackmann', 119),
    // this.createData('Pamela ', 109),
    // this.createData('Juan Pablo Safie', 64),
    // this.createData('Melgar', 0),
    // ];

    const rows = [{
         "name":"Luis Araneda",
         "balance":"178.00"
      },
      {
         "name":"Nicole Stackmann",
         "balance":"143.00"
      },
      {
         "name":"Juan Pablo Safie",
         "balance":"99.00"
      },
      {
         "name":"Astrid Morales",
         "balance":"66.00"},
      {
         "name":"Alejandro Melgar",
         "balance":"17.00"
      }]

    console.log(rows)

    return(
      <div id='wrapper'>
        <div id="title">
          Ranking
        </div>
        <div id="tableContainer">
          <Table id='tabla'>
            <TableHead>
              <TableRow>
                <TableCell id="players">Jugadores</TableCell>
                <TableCell>$ Mises $ </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Grid container >
                      <Grid  item xs={2}>
                        <PersonIcon color="secondary" />
                      </Grid>  
                      <Grid item >
                        {row.name}
                      </Grid>  
                    </Grid>  
                  </TableCell>
                  <TableCell>
                    <Grid container >
                      <Grid  item xs={4}>
                        <LocalAtmIcon color="secondary" />
                      </Grid>
                      <Grid items>
                        {row.balance}
                      </Grid>
                    </Grid>  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      <Footer />
    </div>
      )
  }
}

export default  Ranking