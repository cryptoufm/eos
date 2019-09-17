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
              <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
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
