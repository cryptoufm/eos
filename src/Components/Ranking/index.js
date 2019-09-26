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

  componentDidMount() {
    const match = localStorage.getItem('matchCode')
    console.log(`http://3.87.208.133:5000/getScores?match=${match}`)
    if (match ) {
      this.getRows(match)
    }
    console.log("did mount")
  }


  getRows(match) {
    console.log("fetch", `http://3.87.208.133:5000/getScores?match=${match}`)
    fetch(`http://3.87.208.133:5000/getScores?matchCode=${match}`)
    .then(res => JSON.parse("[" + res + "]"))
    .then(rows => this.setState({ rows }))
    .catch(err => err)

    console.log("rows", this.state.rows)
  }

  renderTable(staterows) {
    let rowsjson = JSON.parse("[" + staterows + "]");
    const json = rowsjson[0]
    console.log("hey", json)
    return  (
      <Table id='tabla'>
        <TableHead>
          <TableRow>
            <TableCell id="players">Jugadores</TableCell>
            <TableCell>$ Mises $ </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { json.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Grid container alignItems = 'center'>
                  <Grid item xs={0}>
                    <PersonIcon color = 'secondary'/>
                  </Grid>
                  <Grid item>
                    {row.name}
                  </Grid>
                </Grid>  
              </TableCell>
              <TableCell>
                <Grid container alignItems='Center'>
                  <Grid item xs={0}>
                   <LocalAtmIcon color  = 'secondary'/>
                  </Grid>
                  <Grid item>
                   {row.balance}
                  </Grid>
                </Grid>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  render() {

    return(
      <div id='wrapper'>
        <div id="title">
          Ranking
        </div>
        <div id="tableContainer">
          {(this.state.rows.length > 0 && this.state.rows.indexOf("error") === -1) ? this.renderTable(this.state.rows) : <div> No se encontraron jugadores </div>}
        </div>
      <Footer />
    </div>
      )
  }
}

export default  Ranking