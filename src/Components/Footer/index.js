import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { withRouter }       from 'react-router-dom'
import { Paper }              from '@material-ui/core'
import { styles }             from './styles.css'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BarChartIcon from '@material-ui/icons/BarChart';
import PersonIcon from '@material-ui/icons/Person';
import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';


class Footer extends Component {

  render() {
    const { children } = this.props

    return (
      <div className={styles}>
        <Paper>
          <div className={`bottom-navigation`}>
          <BottomNavigation
              showLabels
              >
              <BottomNavigationAction label="Account" icon={<PersonIcon />} />
              <BottomNavigationAction label="Game" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Ranking" icon={<BarChartIcon />} />
              <BottomNavigationAction label="Map" icon={<LocationOnIcon />} />
            </BottomNavigation>
          </div>
        </Paper>
      </div>
    )
  }
}

Footer.propTypes = {
  children: PropTypes.node
}

export default  Footer
