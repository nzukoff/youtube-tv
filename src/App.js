import React from 'react';
import { connect } from 'react-redux'

import './App.css';
import Video from './components/Video/Video'
import ChannelDrawer from './components/ChannelDrawer/ChannelDrawer'
// import { addVideo } from './actions/index'
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { 
  Grid,
  Typography
} from '@material-ui/core'

const theme = createMuiTheme({
  typography: { fontFamily: "'Questrial', sans-serif" },
})

const styles = theme => ({
  drawer: {
    textAlign: 'left'
  },
})

export const App = (props) => {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <div>
          <ChannelDrawer />
          <Video />
      </div>
    </MuiThemeProvider>
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
