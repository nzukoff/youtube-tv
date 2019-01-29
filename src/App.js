import React from 'react';
import { connect } from 'react-redux'

import './App.css';
import Video from './components/Video/Video'
import ChannelDrawer from './components/ChannelDrawer/ChannelDrawer'
// import { addVideo } from './actions/index'
import { withStyles } from '@material-ui/core/styles'

import { 
  Grid,
  Typography
} from '@material-ui/core'

const styles = theme => ({
  root: {
    // backgroundColor: '#3e3e3e'
  },
  drawer: {
    textAlign: 'left'
  },
})

export const App = (props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
        <ChannelDrawer />
        <Video />
    </div>
  );
}

const mapStateToProps = state => ({
  channel: state.channel,
  video: state.video
})

// const mapDispatchToProps = dispatch => ({
//   addVideo: () => dispatch(addVideo())
// })

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(App))
