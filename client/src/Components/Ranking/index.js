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


class Ranking extends Component {

  constructor(props){
    super(props);
    this.state = {
      rows: []
    }
  }

  componentWillMount() {
    this.getRows();
  }

  getRows = () => {
    fetch('/api/getRanking')
    .then(res => res.json())
    .then(rows => this.setState({ rows }))
    .catch(err => err)
  }

  renderTable(staterows) {
    let rowsjson = JSON.parse("[" + staterows + "]");
    const json = rowsjson[0]
    console.log("hola", json)
    return  (
      <Table>
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
                {row.name}
              </TableCell>
              <TableCell>{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  render() {

    return(
      <div>
        <div id="title">
          Ranking
        </div>
        <div id="tableContainer">
          {(this.state.rows.length > 0) ? this.renderTable(this.state.rows) : null}
        </div>
      <Footer />
    </div>
      )
  }
}

export default  Ranking